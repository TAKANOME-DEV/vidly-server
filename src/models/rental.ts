import Joi from "joi";
import { model, Schema } from "mongoose";
import * as types from "../types";

const rentalSchema = new Schema<types.Rental>({
	user: {
		type: new Schema({
			name: {
				type: String,
				required: true,
			},
		}),
		required: true,
	},
	rentals: {
		type: [
			{
				_id: false,
				movieId: String,
				rentDate: {
					type: Date,
				},
				returnedDate: {
					type: Date,
				},
				rentalFee: {
					type: Number,
					min: 0,
				},
				status: {
					type: String,
					required: true,
				},
			},
		],
		required: true,
	},
});

const Rental = model("Rental", rentalSchema);

const validateRental = (rental: types.RentalRequest) => {
	const schema = Joi.object({
		returnedDate: Joi.date().required(),
		movieId: Joi.string()
			.regex(/^[0-9a-fA-F]{24}$/, "ObjectId")
			.required(),
		userId: Joi.string()
			.regex(/^[0-9a-fA-F]{24}$/, "ObjectId")
			.required(),
		paymentIntentId: Joi.string().required(),
	});

	return schema.validate(rental);
};

export default {
	Rental,
	validateRental,
};
