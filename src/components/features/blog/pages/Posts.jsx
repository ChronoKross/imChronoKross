import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPosts } from "../BlogAPI";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        if (response && response.data && Array.isArray(response.data)) {
          setPosts(response.data); // Assuming `response.data` contains the posts array
        } else {
          setError("Unexpected response structure");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <div key={post.id} className="post-item">
          <Link to={`/blog/${post.id}`} state={{ post }}>
            <h2>{post.attributes.title}</h2>
            <p>{post.attributes.excerpt}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
