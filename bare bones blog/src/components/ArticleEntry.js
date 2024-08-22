import { useState } from 'react'
import SelectBox from './SelectionBox.js'

export default function ArticleEntry({ addArticle, user }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState(null)

  function submit(e) {
    setError(null)
    e.preventDefault()
    if (!title.trim() || !body.trim()) {
      setError('Both the title and body must be supplied')
      // If I had more time: make the selection box cooler and update display
    } else if (category === '-Choose a Pokemon to talk about-'){
      addArticle({
        title, 
        body, 
        category: '', 
        authorId: user.uid 
      })
    } else {
      addArticle({
        title, 
        body, 
        category, 
        authorId: user.uid 
      })
    }
  }

  function cancel() {
    // sends an empty article to cancel submitting without trying to get the user to fill in all the boxes
    addArticle({})
  }

  return (
    <div>
      <form onSubmit={submit}>
        {error && <p className="error">{error}</p>}
        Title
        <input value={title} onChange={e => setTitle(e.target.value)} />
        Topic Pokemon
        <select onChange={(e) => setCategory(e.target.value)}>
            {SelectBox().map((option) => (
                <option key={option.id}>{option.name}</option>
            ))}
        </select>
        Body
        <textarea rows="8" value={body} onChange={e => setBody(e.target.value)}></textarea>
        <span className = "buttonArea">
          <button className='buttons' type="submit">Create</button>
          <button className='buttons' type="cancel" onClick={cancel} >Cancel</button>
        </span>
      </form>
    </div>
  )
}
