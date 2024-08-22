export default function Nav({ articles, setStudyGuide, page, setPage }) {
  const jumpLeft = '<<'
  const left = '<'
  const right = '>'
  const jumpRight = '>>'

  return (
    <nav>
      {!articles
        ? 'No articles'
        : articles.map(a => (
          <p key={a.id} onClick={() => setStudyGuide(a)}>
            {a.prompt}
          </p>
        ))
      }
      
      <button className='buttons' onClick = {() => setPage(0)}>{jumpLeft}</button>
      <button className='buttons' onClick = {() => setPage(page - 1)}>{left}</button>
      <span> pg {page} </span>
      <button className='buttons' onClick = {() => setPage(page + 1)}>{right}</button>
      <button className='buttons' onClick = {() => setPage(-2)}>{jumpRight}</button>
    </nav>
  )
}