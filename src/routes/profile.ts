/* eslint-disable @typescript-eslint/no-non-null-assertion */
import cloudinary from "cloudinary";
import express, { Request, Response } from "express";
import helpers from "../helpers/auth";
import { asyncMiddleware } from "../middleware/async";
import auth from "../middleware/auth";
import model from "../models/user";
import * as types from "../types";

const router = express.Router();

router.post(
  "/",
  [auth.requireAuth, auth.validateImage, auth.cloudinaryConfig],
  asyncMiddleware(async (req: Request, res: Response) => {
    const token = helpers.getToken(req);
    const decoded = helpers.verifyToken(token as string) as types.JwtPayload;
    if (!req.file) return res.status(400).json("Only image files are allowed!");
    const file = helpers.dataUri(req).content;
    const userInDb = await model.User.findById(decoded._id);
    if (!userInDb) return res.status(400).json("User not found");

    await cloudinary.v2.uploader.destroy(userInDb.imageId!);
    const image = await cloudinary.v2.uploader.upload(file!, {
      folder: "vidly/profile",
    });
    const updatedUser = await model.User.findByIdAndUpdate(
      decoded._id,
      {
        $set: { imageUrl: image.secure_url, imageId: image.public_id },
      },
      { new: true }
    );

    return res.json(updatedUser?.imageUrl);
  })
);

export { router as profile };
