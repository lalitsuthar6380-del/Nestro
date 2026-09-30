import axios from "axios";

const client = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://your-backend.vercel.app/api/",
  timeout: 10000,
  withCredentials: true,
});

console.log("Axios Base URL:", client.defaults.baseURL);

const createSlug = (text = "") => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

export { client, createSlug };