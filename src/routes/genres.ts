import express from "express";
import controller from "../controllers/genres";

const router = express.Router();
router.route("/").get(controller.getGenres);

export { router as genres };
