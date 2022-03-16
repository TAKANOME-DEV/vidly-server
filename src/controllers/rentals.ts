/* eslint-disable no-mixed-spaces-and-tabs */
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { getToken, verifyToken } from "../helpers/auth";
import { numberOfDays } from "../helpers/numberOfDays";
import { asyncMiddleware } from "../middleware/async";
import { Movie } from "../models/movie";
import { Payment } from "../models/payment";
import { Rental } from "../models/rental";
import { User } from "../models/user";
import { JwtPayload } from "../types/JwtPayload";
import { Params } from "../types/ParamsType";
import { RentalRequestType } from "../types/RentalType";

export const handleGetRentals = asyncMiddleware(
	async (req: Request, res: Response) => {
		const token = getToken(req);
		const payload = verifyToken(token as string) as JwtPayload;
		const rentals = await Rental.find({ userId: payload._id });
		const filterRentals = rentals.filter((r) => r.returnedDate > new Date());
		return res.json(filterRentals);
	}
);

// export const handleGetRental = asyncMiddleware(
// 	async (req: Request, res: Response) => {
// 		const rental = await Rental.findById(req.params.id);
// 		if (!rental) return res.status(404).json("Rental Not Found");
// 		return res.json(rental);
// 	}
// );

export const handleCreateRental = async (
	req: Request<Params, unknown, RentalRequestType>,
	res: Response,
	next: NextFunction
) => {
	const { movieId, userId, returnedDate, paymentIntentId } = req.body;
	const movie = await Movie.findByIdAndUpdate(
		movieId,
		{ $set: { rentals: { _id: userId } } },
		{ new: true }
	);
	if (!movie) return res.status(400).json("No movie was found");
	if (movie.numberInStock === 0)
		return res.status(404).json("The stock for this movie is empty");
	const user = await User.findById(userId);
	if (!user) return res.status(400).json("User not found");
	const payment = await Payment.findOne({ paymentId: paymentIntentId });
	if (!payment) return res.status(400).json("No payment was found");
	// if (payment?.status !== "succeeded")
	// return res.status(400).json("The payment is not succeeded yet");

	const days = numberOfDays(new Date(returnedDate), new Date());
	const rentalFee = days * movie.dailyRentalRate;

	try {
		const session = await mongoose.startSession();
		await session.withTransaction(async () => {
			await Rental.create({
				userId: user._id,
				movie: {
					_id: movie._id,
					title: movie.title,
					url: movie.url,
					voteAverage: movie.voteAverage,
					rentals: movie.rentals,
				},
				rentDate: new Date(),
				returnedDate,
				rentalFee,
				status: payment?.status,
			});

			movie.numberInStock--;
			await movie.save();
			return res.json("Movie successfully rented");
		});
		return void session.endSession();
	} catch (err) {
		return next(err);
	}
};
