import express from "express";
import { handleGetImage } from "../controllers/image";

const router = express.Router();

router.route("/").get(handleGetImage);

export { router as image };
