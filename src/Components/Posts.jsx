export default function Posts({ post, onClick }) {
  return (
    <div className="card">
      <li>
        <h3>{post.title}</h3>
        <div className="row">
          <div className="column">
            <img src={post.image} alt={post.title} />
          </div>
          <div className="column column-info">
            <p>{post.content}</p>
            <ul className="tag">
              {post.tags.map((tag, index) => {
                return <li key={index}>{tag}</li>;
              })}
            </ul>
            <button onClick={onClick}>&#9746;</button>
            {post.available ? (
              <h5>(Disponibile)</h5>
            ) : (
              <h5>(Non Disponibile)</h5>
            )}
          </div>
        </div>
      </li>
    </div>
  );
}
