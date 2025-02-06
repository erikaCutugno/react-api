export default function Posts({ post, onClick }) {
  return (
    <div className="card">
      <li>
        <h3>{post.title}</h3>
        <div className="row">
          <img src={post.image} alt={post.title} />
          <div className="column">
            <p>{post.content}</p>
            {post.tags}
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
