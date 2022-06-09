import express from "express";
import controller from "../controllers/feedbacks";
import auth from "../middleware/auth";
import validation from "../middleware/validation";
import model from "../models/feedback";

const router = express.Router();
router.get("/", auth.requireAdmin, controller.getFeedbacks);
router.post(
  "/",
  validation.validateRequest(model.validateFeedback),
  controller.postFeedback
);

export { router as feedbacks };
