import { useState, useEffect } from "react";
import { getAllPosts } from "../BlogAPI";
import PostCard from "../components/PostCard";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10); // Variable to specify how many posts to fetch

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts(limit);
        if (response && response.data && response.data.data) {
          setPosts(response.data.data); // Assuming `response.data.data` contains the posts array
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
  }, [limit]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
