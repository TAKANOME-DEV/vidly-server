import Joi from "joi";
import { model, Schema } from "mongoose";
import * as types from "../types";

const Feedback = model<types.Feedback>(
	"Feedback",
	new Schema<types.Feedback>({
		subject: {
			type: String,
			trim: true,
			required: true,
			maxlength: 300,
		},
		message: {
			type: String,
			trim: true,
			required: true,
			maxlength: 500,
		},
		username: {
			type: String,
			default: null,
		},
		email: {
			type: String,
			default: null,
		},
	})
);

const validateFeedback = (feedback: types.Feedback) => {
	const schema = Joi.object({
		subject: Joi.string().trim().max(300).required(),
		message: Joi.string().trim().max(500).required(),
	});

	return schema.validate(feedback);
};

export default {
	Feedback,
	validateFeedback,
};
