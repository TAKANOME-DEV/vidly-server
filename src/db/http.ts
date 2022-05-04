import axios from "axios";

export const http = axios.create({
	baseURL: process.env.TMDB_URL,
	params: { api_key: process.env.TMDB_API_KEY },
});
