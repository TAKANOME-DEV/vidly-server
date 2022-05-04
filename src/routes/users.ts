import express from "express";
import controller from "../controllers/users";
import auth from "../middleware/auth";
import validation from "../middleware/validation";
import model from "../models/user";

const router = express.Router();
router.get("/", auth.requireAdmin, controller.getUsers);
router.get(
	"/:id",
	[validation.validateId, auth.requireAdmin],
	controller.getUserById
);
router.post(
	"/",
	validation.validateRequest(model.validateUser),
	controller.createUser
);
router.put(
	"/:id",
	[validation.validateId, auth.requireAuth],
	controller.updateUser
);
router.put(
	"/reset/:id",
	[validation.validateId, auth.requireAuth],
	controller.updatePassword
);
router.delete(
	"/:id",
	[validation.validateId, auth.requireAdmin],
	controller.deleteUser
);

export { router as users };
