import { useState, useEffect } from 'react'
import { getStudyGuide } from './api.js'
import { SignIn, SignOut, useAuthentication } from '../services/authService.js'
import { fetchArticles, createArticle } from '../services/articleService.js'
import Loader from './Loader.js';
import Nav from './Nav.js'
import Article from './Article.js';
import './App.css'

// the app function
export default function Home() {
  const [subjectInput, setSubjectInput] = useState('')
  const [prompt, setPrompt] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([])
  const [studyGuide, setStudyGuide] = useState()
  const [page, setPage] = useState(0)
  const user = useAuthentication()

  // handles comunication with openai api
  async function onSubmit(event) {
    event.preventDefault()
    setPrompt(subjectInput)
    setSubjectInput('')
    setLoading(true)
    try {
      const response = await getStudyGuide(subjectInput)
      setResult(response)
      setLoading(false)
    } catch (error) {
      // TODO more error handling
      // rate limit
      // no message in input
      console.error(error)
      alert(error.message)
    }
  }

  // gets articles
  useEffect(() => {
    const retrieveArticles = async () => {
      try {
        const articles = await fetchArticles()
        setArticles(articles)
        // TODO setup pagiation
      } catch (error) {
        if (error.message === "Missing or insufficient permissions.") {
          // just need to log in, nothing is wrong
        } else {
          console.error(error.message)
        }
      }
    }

    retrieveArticles()
  }, [user])

  // when we create a new study guide, add it to the database and make it active
  useEffect(() => {
    // we have to use loading to make sure all the data is here
    if (loading === false) {
      // create a new article for the study guide if possible
      if (prompt !== null && result !== null){
        createArticle({prompt, result}).then(article => {
          // set the new study guide as active
          setStudyGuide(studyGuide => {
            return article
          })
          // save it to the database
          setArticles(articles => [article, ...articles])
        })
        
        // cleanup values to avoid duplicates
        setPrompt(prompt => {
          return null
        })
        setResult(result => {
          return null
        })
      }
    }
  }, [loading, prompt, result]) 

  return (
    <div className='App'>
      <div className='login'>
        <span/>
        {!user ? <SignIn /> : <SignOut />}
      </div>

      <span className='title'>
        <h1> Study Buddy: The Study Guide Creator </h1>
        <img src="/dog.png" className="icon" alt="a dog" />
      </span>

      <div className='layout'>
        <div className='articles-nav'>
          {user ? <p>Other Study Guides</p> : <p>log in with google to save study guides and see past guides</p>}
          {user ? <Nav articles={articles} setStudyGuide={setStudyGuide} page = {page} setPage={setPage}/> : <p/>}
        </div>

        <main className="body">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="subject"
              placeholder="Enter an subject"
              value={subjectInput}
              onChange={e => setSubjectInput(e.target.value)}
            />
            <input type="submit" value="Generate study guide" />
          </form>

          <div className="result">
            {loading && <h3>Loading...</h3>}
            {loading && <Loader/>}
            {!loading && <Article article={studyGuide}/>}            
          </div>
        </main>
      </div>
    </div>
  )
}
