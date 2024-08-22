
export default function Article({ article }) {
  return (
    <article>
      {!article ? (
        <h2>No study guide selected. </h2>
      ) : (
        <section>
          <h2>{article.prompt}</h2>
          <p className="content">{article.content}</p>
        </section>
      )}
    </article>
  )
}
