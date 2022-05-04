import { model, Schema } from "mongoose";
import * as types from "../types";

const Payment = model<types.Payment>(
	"Payment",
	new Schema<types.Payment>({
		paymentId: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
		movieId: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
		client_secret: {
			type: String,
			required: true,
		},
		createAt: {
			type: Number,
			required: true,
		},
	})
);

export default {
	Payment,
};
