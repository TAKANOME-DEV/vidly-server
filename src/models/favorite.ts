import { model, Schema } from "mongoose";
import * as types from "../types";

const Favorite = model<types.Favorite>(
	"Favorite",
	new Schema<types.Favorite>({
		user: {
			type: new Schema({
				name: {
					type: String,
					required: true,
				},
			}),
			required: true,
		},
		favorites: {
			type: [
				{
					_id: false,
					movieId: String,
					date: {
						type: Date,
						default: Date.now,
					},
				},
			],
			required: true,
		},
	})
);

export default {
	Favorite,
};
