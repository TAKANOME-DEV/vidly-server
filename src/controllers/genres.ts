import { Request, Response } from "express";
import { http } from "../db/http";
import { asyncMiddleware } from "../middleware/async";

const getGenres = asyncMiddleware(async (req: Request, res: Response) => {
	const request = await http.get(`/genre/movie/list`);
	return res.json(request.data);
});

export default {
	getGenres,
};
