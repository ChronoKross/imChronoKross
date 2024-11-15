import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../BlogAPI";
import parse from "html-react-parser";

const SinglePost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id); // Fetch the post by ID
        console.log("Full Post Response:", response);

        if (response && response.data && response.data.data) {
          console.log(
            "Setting post with response.data.data:",
            response.data.data
          );
          setPost(response.data.data);
        } else if (response && response.data) {
          console.log(
            "Setting post directly with response.data:",
            response.data
          );
          setPost(response.data);
        } else {
          console.log("Unexpected response structure");
          setError("Unexpected response structure");
        }
      } catch (err) {
        console.error("Error Fetching Post:", err);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log("Loading set to false");
      }
    };

    fetchPost();
  }, [id]);

  // Loading and error handling
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Ensure that the post and its attributes exist before rendering
  if (!post || !post.attributes) {
    console.log("Post or attributes not available:", post);
    return <p>No post available</p>;
  }

  // Parse the HTML content into React elements
  const parsedContent = parse(post.attributes.content);

  // Render the post content with the embedded HTML and Tailwind styling
  return (
    <div className="single-post max-w-3xl mx-auto p-6 text-white bg-black shadow-md rounded-md">
      <h1 className="text-4xl font-bold mb-4">{post.attributes.title}</h1>
      <div className="post-content">{parsedContent}</div>
    </div>
  );
};

export default SinglePost;
