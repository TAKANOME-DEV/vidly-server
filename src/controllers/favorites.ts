import { Request, Response } from "express";
import helpers from "../helpers/auth";
import { asyncMiddleware } from "../middleware/async";
import favoriteModel from "../models/favorite";
import userModel from "../models/user";
import * as types from "../types";

const getFavorites = asyncMiddleware(async (req: Request, res: Response) => {
	const token = helpers.getToken(req);
	const decoded = helpers.verifyToken(token as string) as types.JwtPayload;
	const favorites = await favoriteModel.Favorite.findOne({
		"user._id": decoded._id,
	});
	return res.json(favorites);
});

const postFavorite = asyncMiddleware(
	async (
		req: Request<unknown, unknown, types.FavoriteRequest>,
		res: Response
	) => {
		const { userId, movieId } = req.body;
		const user = await userModel.User.findById(userId);
		if (!user) return res.status(400).json("User not found");
		// const movie = await Movie.findById(movieId);
		// if (!movie) return res.status(400).json("Movie not found");

		const userInFav = await favoriteModel.Favorite.findOne({
			"user._id": userId,
		});

		if (userInFav) {
			userInFav.favorites.push({ movieId });
			await userInFav.save();
		} else {
			await favoriteModel.Favorite.create({
				user: {
					_id: user?._id,
					name: user?.name,
				},
				favorites: [{ movieId }],
			});
		}

		return res.json("Movie added to favorites");
	}
);

const deleteFavorite = asyncMiddleware(
	async (req: Request<types.RequestParams>, res: Response) => {
		const token = helpers.getToken(req);
		const user = helpers.verifyToken(token as string) as types.JwtPayload;
		const { movieId } = req.params;

		await favoriteModel.Favorite.findOneAndUpdate(
			{
				"user._id": user._id,
			},
			{
				$pull: { favorites: { movieId: movieId } },
			}
		);

		return res.json("Movie removed from favorites");
	}
);

const deleteFavorites = asyncMiddleware(async (req: Request, res: Response) => {
	const { userId } = req.params;
	await favoriteModel.Favorite.deleteOne({ "user._id": userId });
	return res.json("Movies removed from favorites");
});

export default {
	getFavorites,
	postFavorite,
	deleteFavorite,
	deleteFavorites,
};
