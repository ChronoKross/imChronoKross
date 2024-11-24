import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../BlogAPI";
import PostCard from "../components/PostCard";

const Posts = () => {
  const limit = 15; // Variable to specify how many posts to fetch

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", limit], // Unique query key
    queryFn: () => getAllPosts(limit), // Fetching function
    select: (response) => response?.data?.data || [], // Extract posts from response
    retry: 1, // Retry once on failure
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
