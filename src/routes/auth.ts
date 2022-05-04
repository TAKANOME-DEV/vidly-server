import express from "express";
import controller from "../controllers/auth";
import validation from "../middleware/validation";

const router = express.Router();
router.post(
	"/",
	validation.validateRequest(controller.validateLogUser),
	controller.logUser
);

export { router as auth };
