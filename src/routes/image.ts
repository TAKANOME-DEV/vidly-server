import cloudinary from "cloudinary";
import express, { Request, Response } from "express";
import { dataUri } from "../helpers/auth";
import { asyncMiddleware } from "../middleware/async";
import {
	cloudinaryConfig,
	handleValidateImage,
	requireAuth,
} from "../middleware/auth";
import { User } from "../models/user";

const router = express.Router();

router.post(
	"/",
	[requireAuth, handleValidateImage, cloudinaryConfig],
	asyncMiddleware(async (req: Request, res: Response) => {
		const id = req.header("X-User-Id");
		const file = dataUri(req).content;
		const userInDb = await User.findById(id);
		await cloudinary.v2.uploader.destroy(userInDb!.imageId!);
		const image = await cloudinary.v2.uploader.upload(file!, {
			folder: "vidly/profile",
		});
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				$set: { imageUrl: image.secure_url, imageId: image.public_id },
			},
			{ new: true }
		);

		return res.json(updatedUser?.imageUrl);
	})
);

export { router as image };
