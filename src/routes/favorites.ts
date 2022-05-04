import express from "express";
import controller from "../controllers/favorites";
import auth from "../middleware/auth";

const router = express.Router();

router.get("/", auth.requireAuth, controller.getFavorites);
router.post("/", auth.requireAuth, controller.postFavorite);
router.delete("/:movieId", auth.requireAuth, controller.deleteFavorite);
router.delete("/:userId/clear", auth.requireAuth, controller.deleteFavorites);

export { router as favorites };
