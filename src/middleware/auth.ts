import cloudinary from "cloudinary";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import helpers from "../helpers/auth";
import * as types from "../types";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = helpers.getToken(req);
  if (!token) return res.status(401).json("Access denied. No token provided");

  try {
    const payload = helpers.verifyToken(token) as types.JwtPayload;
    if (payload?._id) return next();
  } catch (err) {
    return res.status(400).json("Invalid token");
  }
};

const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = helpers.getToken(req);
  if (!token) return res.status(401).json("Access denied. No token provided");

  try {
    const decoded = helpers.verifyToken(token) as types.JwtPayload;
    if (!decoded?.isAdmin) return res.status(403).json("Access denied.");
    return next();
  } catch (err) {
    return res.status(400).json("Invalid token");
  }
};

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
      cb(null, false);
    }
    return cb(null, true);
  },
}).single("image");

const validateImage = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json(err);
    } else if (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return res.status(400).json(err.message);
    }

    return next();
  });
};

const cloudinaryConfig = (req: Request, res: Response, next: NextFunction) => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return next();
};

export default {
  requireAuth,
  requireAdmin,
  validateImage,
  cloudinaryConfig,
};
