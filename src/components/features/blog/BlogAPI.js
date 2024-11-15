// BlogApi.js
import axios from "axios";

// Dynamically set the BASE_URL based on the current domain
const BASE_URL =
  window.location.hostname === "www.imchronokross.com"
    ? "https://api.imchronokross.com/api"
    : "http://localhost:1338/api";

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
  const response = await fetch(`${BASE_URL}/blog-posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Ensures cookies are included
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create post");
  }

  return response.json();
};

export default {
  getAllPosts,
  getPostById,
  createPost,
};
