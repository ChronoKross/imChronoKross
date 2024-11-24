import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../BlogAPI";
import parse from "html-react-parser";

const SinglePost = () => {
  const { id } = useParams(); // Get the post ID from the URL

  // Use React Query's `useQuery` to fetch the post
  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id], // Unique key for caching
    queryFn: () => getPostById(id), // Fetching function
    enabled: !!id, // Prevent query from running if `id` is falsy
    select: (response) => response?.data?.data || response?.data, // Extract the post data
    retry: 1, // Retry once on failure
  });

  // Loading and error handling
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Ensure that the post and its attributes exist before rendering
  if (!post?.attributes) {
    return <p>No post available</p>;
  }

  // Parse the HTML content into React elements
  const parsedContent = parse(post.attributes.content || "");

  // Render the post content with the embedded HTML and Tailwind styling
  return (
    <div className="single-post max-w-3xl mx-auto p-6 text-white bg-black shadow-md rounded-md">
      <h1 className="text-4xl font-bold mb-4">{post.attributes.title}</h1>
      <div className="post-content">{parsedContent}</div>
    </div>
  );
};

export default SinglePost;
