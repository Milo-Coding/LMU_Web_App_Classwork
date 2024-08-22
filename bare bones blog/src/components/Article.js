import { formatRelative, isValid } from 'date-fns'
import Category from './Category'
import './Article.css'


export default function Article({ article }) {
  const myDate = article?.date.toDate()
  const formDate = isValid(myDate) ? formatRelative(myDate, new Date()) : ''
  return (
    <article>
      {!article ? (
        <h2>No article selected. <br/> Select an article on the left to read it and/or, <br/>select some pokemon up above to filter the articles</h2>
      ) : (
        <section>
          <h5 className = "prelude">
            <span className="date">
              {`Posted: ${formDate}`}
            </span>

            {article.category && (
              <Category category = {article.category} />
            )}
          </h5>
          <h2>{article.title}</h2>
          {article.authorId && (<p>written by {article.authorId}</p>)}
          <p className="body">{article.body}</p>
        </section>
      )}
    </article>
  )
}
