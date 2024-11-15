// BlogApi.js
import axios from "axios";

// Dynamically set the BASE_URL based on the current domain
const BASE_URL =
  window.location.hostname === "imchronokross.com"
    ? "https://api.imchronokross.com/api"
    : "http://localhost:1338/api";

export const getAllPosts = (limit = 10) => {
  return axios.get(`${BASE_URL}/blog-posts?pagination[limit]=${limit}`, {
    withCredentials: true, // Ensures cookies are included
  });
};

export const getPostById = (id) => {
  return axios.get(`${BASE_URL}/blog-posts/${id}`, {
    withCredentials: true, // Ensures cookies are included
  });
};

export const createPost = async (postData) => {
  if (BASE_URL) console.log(BASE_URL);
  else console.log("BASE_URL not set");
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
