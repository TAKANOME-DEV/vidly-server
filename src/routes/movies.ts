import express from "express";
import controller from "../controllers/movies";

const router = express.Router();

router.route("/:page").get(controller.getMovies);
router.route("/trending/:page").get(controller.getTrendingMovies);
router.route("/popular/:page").get(controller.getPopularMovies);
router.route("/similar/:id").get(controller.getSimilarMovies);
router.route("/videos/:id").get(controller.getMovieVideos);
router.route("/movie/:id").get(controller.getMovieById);

export { router as movies };
