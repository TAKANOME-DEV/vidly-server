import { Request, Response } from "express";
import { http } from "../db/http";
import { asyncMiddleware } from "../middleware/async";
import * as types from "../types";

const getMovieByQuery = asyncMiddleware(
  async (
    req: Request<unknown, unknown, types.MoviesRequest>,
    res: Response
  ) => {
    const { query, page } = req.body;
    const result = await http.get(`/search/movie?query=${query}&page=${+page}`);
    return res.json(result.data);
  }
);

export default {
  getMovieByQuery,
};
