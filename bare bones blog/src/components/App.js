import { useEffect, useState } from 'react'
import Nav from './Nav'
import Article from './Article'
import ArticleEntry from './ArticleEntry'
import { SignIn, SignOut, useAuthentication } from '../services/authService'
import { fetchArticles, createArticle } from '../services/articleService'
import './App.css'
import {getImages} from './Images.js'

export default function App() {
  const [articles, setArticles] = useState([])
  const [article, setArticle] = useState(null)
  const [writing, setWriting] = useState(null)
  const user = useAuthentication()
  const imageDisplay = getImages()
  const [filters, setFilter] = useState([])
  const [lastVisible, setLastVisible] = useState(null)
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState (1)
  const [displayedItems, setDisplayedItems] = useState(null)

  useEffect(() => {
    const retrieveArticles = async () => {
      const articles = await fetchArticles(filters)
      setArticles(articles)
      setLastVisible(articles[articles.length - 1]?.originalDoc)
      setDisplayedItems(articles.length)
    }

    retrieveArticles()
  }, [user, filters])

  // handle changing articles with page changes
  useEffect(() => {
    // moving forward one page
    if (page > lastPage && displayedItems === 10) {
      const retrieveArticles = async () => {
        const newArticles = await fetchArticles(filters, lastVisible)
        setArticles([...newArticles])
        setLastVisible(newArticles[newArticles.length - 1]?.originalDoc)
        setDisplayedItems(newArticles.length)
      }
      retrieveArticles()
      setLastPage(page)
    }
    // moving backwards to page one
    else if (page < lastPage && page > 0) {
      const retrieveArticles = async () => {
        const oldArticles = await fetchArticles(filters)
        setArticles(oldArticles)
        setLastVisible(oldArticles[oldArticles.length - 1]?.originalDoc)
        setDisplayedItems(oldArticles.length)
      }
      retrieveArticles()
      setPage(1)
      setLastPage(page)
    }
    // don't allow moving to pages that don't exist
    else {
      setPage(lastPage)
    }
    
  }, [page, displayedItems, lastPage, lastVisible, filters])

  // Update the "database" *then* update the internal React state. These
  // two steps are definitely necessary.
  function addArticle({ title, body, category}) {
    if (title === undefined || body === undefined) {
      // handles cancel button
      setWriting(false)
    } else {
      createArticle({ title, body, category}).then(article => {
        setArticle(article)
        setArticles([article, ...articles])
        setWriting(false)
      })
    }
  }

  // allow clicking on the images from Images.js
  function handleImageClick(event) {
    const clickedImage = event.target
    const num = clickedImage.getAttribute('num')
    const filterID = "Pokemon #" + num
    if (clickedImage.style.backgroundColor === '') {
      clickedImage.style.backgroundColor = 'skyblue'
      const updatedList = filters.concat(filterID)
      setFilter(updatedList)
    } else {
      clickedImage.style.backgroundColor = ''
      const updatedList = filters.filter((item) => item !== filterID)
      setFilter(updatedList)
    }
  }

  return (
    <div className = "App">
      <header>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Press+Start+2P" />
        <span className='title' >Pokemon Blog</span>
        {user && <button className="buttons" onClick={() => setWriting(true)}>New Article</button>}
        {!user ? <SignIn /> : <SignOut />}
      </header>

      <span className = 'images' onClick={handleImageClick}>
        {imageDisplay}
      </span>

      {user ? <Nav articles={articles} setArticle={setArticle} page = {page} setPage={setPage}/> : <h2>log in with google to see posts</h2>}

      {writing ? <ArticleEntry addArticle={addArticle} user = {user} /> : user ? <Article article={article} /> : <p></p>}
    </div>
  )
}
