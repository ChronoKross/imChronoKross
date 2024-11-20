// BlogApi.js
import axios from "axios";

// Dynamically set the BASE_URL based on the current domain
const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:1338/api"
    : "https://api.imchronokross.com/api";

console.log("Current hostname:", window.location.hostname);
console.log("BASE_URL is set to:", BASE_URL);

export const getAllPosts = (limit = 10) => {
  console.log("Fetching all posts with BASE_URL:", BASE_URL);
  return axios.get(`${BASE_URL}/blog-posts?pagination[limit]=${limit}`, {
    withCredentials: true, // Ensures cookies are included
  });
};

export const getPostById = (id) => {
  console.log("Fetching post by ID with BASE_URL:", BASE_URL);
  return axios.get(`${BASE_URL}/blog-posts/${id}`, {
    withCredentials: true, // Ensures cookies are included
  });
};

export const createPost = async (postData) => {
  console.log("Creating post with BASE_URL:", BASE_URL);
  try {
    const response = await axios.post(`${BASE_URL}/blog-posts`, postData, {
      withCredentials: true, // Ensures cookies are included
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error creating post:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to create post");
  }
};

export default {
  getAllPosts,
  getPostById,
  createPost,
};
