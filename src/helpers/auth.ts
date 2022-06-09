/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcrypt from "bcryptjs";
import DataURIParser from "datauri/parser";
import dotenv from "dotenv";
import { Request } from "express";
import jwt from "jsonwebtoken";
import path from "path";
import * as types from "../types";

dotenv.config();

const generateAuthToken = (user: types.User) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      imageUrl: user.imageUrl,
    },
    process.env.JWT_PRIVATE_KEY as string
  );
  return token;
};

const getToken = (req: Request) => req.header("X-Auth-Token");

const verifyToken = (token: string): string | types.JwtPayload => {
  return jwt.verify(token, process.env.JWT_PRIVATE_KEY!);
};

const generateHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const validateHash = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

const dUri = new DataURIParser();

/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from the string buffer
 * @see {@link https://medium.com/@joeokpus/uploading-images-to-cloudinary-using-multer-and-expressjs-f0b9a4e14c54}
 */

const dataUri = (req: Request) => {
  return dUri.format(
    path.extname(req.file!.originalname).toString(),
    req.file!.buffer
  );
};

export default {
  generateAuthToken,
  getToken,
  verifyToken,
  generateHash,
  validateHash,
  dataUri,
};
