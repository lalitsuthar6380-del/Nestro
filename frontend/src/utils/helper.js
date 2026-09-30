import axios from "axios";

const configuredApiBaseUrl = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api"
).replace(/\/+$/, "");

const apiBaseUrl = `${
  /\/api$/i.test(configuredApiBaseUrl)
    ? configuredApiBaseUrl
    : `${configuredApiBaseUrl}/api`
}/`;

const client = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  withCredentials: true,
});

const createSlug = (text = "") => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
};

export { client, createSlug };
