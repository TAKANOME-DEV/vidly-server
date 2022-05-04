import { Request, Response } from "express";
import Joi from "joi";
import helpers from "../helpers/auth";
import { asyncMiddleware } from "../middleware/async";
import model from "../models/user";
import * as types from "../types";

const logUser = asyncMiddleware(
	async (req: Request<unknown, unknown, types.User>, res: Response) => {
		const { email, password } = req.body;
		const user = await model.User.findOne({ email });
		if (!user) return res.status(400).json("Invalid email or password");
		const isValid = await helpers.validateHash(password, user.hash as string);
		if (!isValid) return res.status(400).json("Invalid email or password");
		const token = helpers.generateAuthToken(user);
		return res.json(token);
	}
);

const validateLogUser = (user: types.User) => {
	const schema = Joi.object({
		email: Joi.string().email().min(8).max(50).required(),
		password: Joi.string().min(8).max(50).required(),
	});

	return schema.validate(user);
};

export default {
	logUser,
	validateLogUser,
};
