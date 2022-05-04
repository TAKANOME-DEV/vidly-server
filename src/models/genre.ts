import Joi from "joi";
import { model, Schema } from "mongoose";
import * as types from "../types";

const genreSchema = new Schema<types.Genre>({
	name: {
		type: String,
		trim: true,
		required: true,
		minlength: 3,
		maxlength: 255,
	},
});

const Genre = model("Genre", genreSchema);

const validateGenre = (genre: types.Genre) => {
	const schema = Joi.object({
		name: Joi.string().trim().min(3).max(50).required(),
	});

	return schema.validate(genre);
};

export default {
	Genre,
	genreSchema,
	validateGenre,
};
