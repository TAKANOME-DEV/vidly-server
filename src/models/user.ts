import Joi from "joi";
import { model, Schema } from "mongoose";
import * as types from "../types";

const userSchema = new Schema<types.User>({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 255,
  },
  hash: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
    default:
      "https://res.cloudinary.com/dafwzsod0/image/upload/v1646766184/vidly/profile/cymfcxo7imebgns0rkp4.jpg",
  },
  imageId: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model<types.User>("User", userSchema);

const validateUser = (user: types.User) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(5).max(50).required(),
    password: Joi.string().min(8).max(50).required(),
    email: Joi.string().email().min(8).max(50).required(),
  });

  return schema.validate(user);
};

const validateUpdatedUser = (user: Pick<types.User, "name" | "email">) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(5).max(50).required(),
    email: Joi.string().email().min(8).max(50).required(),
  });

  return schema.validate(user);
};

export default {
  User,
  validateUpdatedUser,
  validateUser,
};
