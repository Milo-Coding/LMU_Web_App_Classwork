export default function Nav({ articles, setArticle, page, setPage }) {
  // If I had more time: make pages scroll by 10 forward and backward instead of jump to start
  const left = 'jump to start'
  const right = 'next 10'

  return (
    <nav>
      {!articles
        ? 'No articles'
        : articles.map(a => (
          <p key={a.id} onClick={() => setArticle(a)}>
            {a.title}
          </p>
        ))
      }
      
      <button className='buttons' onClick = {() => setPage(page - 1)}>{left}</button>
      <span> page {page} </span>
      <button className='buttons' onClick = {() => setPage(page + 1)}>{right}</button>
    </nav>
  )
}