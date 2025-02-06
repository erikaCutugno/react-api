import { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./Components/Posts";

const initialFormData = {
  title: "",
  image: "",
  content: "",
  tags: "",
  available: false,
};
export default function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  const fetchPosts = () => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setPosts(res.data);
    });
  };

  const handleFormData = (fieldName, value) => {
    setFormData((currentState) => ({ ...currentState, [fieldName]: value }));
  };

  const articleDelete = (postId) => {
    axios.delete(`http://localhost:3001/posts/${postId}`).then(() => {
      setPosts((currentState) =>
        currentState.filter((post) => post.id !== postId)
      );
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3001/posts", formData).then((res) => {
      setPosts((currentState) => [...currentState, res.data]);
      setFormData(initialFormData);
    });
  };

  useEffect(fetchPosts, []);

  return (
    <>
      <div className="container">
        <h1>Lista Articoli</h1>
        <ul>
          {posts.map((post) => (
            <Posts
              key={post.id}
              post={post}
              onClick={() => articleDelete(post.id)}
            />
          ))}
        </ul>
        <h3>Aggiungi articoli</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="article">Nome Articolo:</label>
            <input
              id="article"
              type="text"
              placeholder="Articolo"
              value={formData.title}
              onChange={(e) => {
                handleFormData("title", e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="image">Immagine Articolo:</label>
            <input
              id="image"
              type="url"
              placeholder="http://image"
              value={formData.image}
              onChange={(e) => {
                handleFormData("image", e.target.value);
              }}
            />
          </div>
          <div>
            <p>
              <label htmlFor="content">Contenuto:</label>
            </p>

            <textarea
              name="content"
              id="content"
              rows="4"
              cols="40"
              value={formData.content}
              onChange={(e) => {
                handleFormData("content", e.target.value);
              }}
            ></textarea>
          </div>
          <div>
            <label htmlFor="tags">Scegli la categoria:</label>
            <select
              name="tags"
              id="tags"
              value={formData.tags}
              onChange={(e) => {
                handleFormData("tags", e.target.value);
              }}
            >
              <option value="" hidden>
                None
              </option>
              <option value="Dolce">Dolce</option>
              <option value="Salato">Salato</option>
              <option value="Biscotti">Biscotti</option>
            </select>
          </div>
          <label htmlFor="available">Disponibile</label>
          <input
            type="checkbox"
            id="available"
            checked={formData.available}
            onChange={(e) => {
              handleFormData("available", e.target.checked);
            }}
          />
          <button type="submit">Invia</button>
        </form>
      </div>
    </>
  );
}
