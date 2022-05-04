import express from "express";
import controller from "../controllers/search";
import validation from "../middleware/validation";

const router = express.Router();

router.post("/", validation.validateQuery, controller.getMovieByQuery);

export { router as search };
