/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from "express";
import { http } from "../db/http";
import { asyncMiddleware } from "../middleware/async";
import * as types from "../types";

const getMovies = asyncMiddleware(
	async (req: Request<types.RequestParams>, res: Response) => {
		const result = await http.get<types.MoviesResponse>(
			`/movie/now_playing?page=${+req.params.page}`
		);
		return res.json(result.data);
	}
);

const getPopularMovies = asyncMiddleware(
	async (req: Request<types.RequestParams>, res: Response) => {
		const result = await http.get<types.MoviesResponse>(
			`/movie/popular?page=${+req.params.page}`
		);
		return res.json(result.data);
	}
);

const getTrendingMovies = asyncMiddleware(
	async (req: Request<types.RequestParams>, res: Response) => {
		const result = await http.get<types.MoviesResponse>(
			`/trending/movie/day?page=${+req.params.page}`
		);
		return res.json(result.data);
	}
);

const getSimilarMovies = asyncMiddleware(
	async (req: Request<types.RequestParams>, res: Response) => {
		const result = await http.get<types.MoviesResponse>(
			`/movie/${+req.params.id}/similar`
		);
		return res.json(result.data);
	}
);

const getMovieVideos = asyncMiddleware(
	async (req: Request<types.RequestParams>, res: Response) => {
		const result = await http.get<types.MoviesResponse>(
			`/movie/${+req.params.id}/videos`
		);
		return res.json(result.data);
	}
);

const getMovieById = asyncMiddleware(
	async (req: Request<types.RequestParams>, res: Response) => {
		console.log("Get movie by id", +req.params.id);
		const result = await http.get<types.Movies>(`/movie/${+req.params.id}`);
		return res.json(result.data);
	}
);

export default {
	getMovieById,
	getMovies,
	getTrendingMovies,
	getPopularMovies,
	getSimilarMovies,
	getMovieVideos,
};
