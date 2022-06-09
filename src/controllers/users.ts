import { Request, Response } from "express";
import helpers from "../helpers/auth";
import { asyncMiddleware } from "../middleware/async";
import model from "../models/user";
import * as types from "../types";

const getUsers = asyncMiddleware(async (req: Request, res: Response) => {
  const users = await model.User.find().sort("name").select("-hash");
  return res.json(users);
});

const getUserById = asyncMiddleware(async (req: Request, res: Response) => {
  const user = await model.User.findById(req.params.id).select("-hash");
  if (!user) return res.status(404).json("User Not Found");
  return res.json(user);
});

const createUser = asyncMiddleware(
  async (req: Request<unknown, unknown, types.User>, res: Response) => {
    const { name, email } = req.body;
    const isEmail = await model.User.findOne({ email });
    if (isEmail)
      return res.status(400).json("Address email is already registered");
    const hash = await helpers.generateHash(req.body.password);
    const user = await model.User.create({ name, email, hash });
    const token = helpers.generateAuthToken(user);
    return res.json(token);
  }
);

const updateUser = asyncMiddleware(
  async (
    req: Request<types.RequestParams, unknown, types.User>,
    res: Response
  ) => {
    const { name, email } = req.body;
    const user = await model.User.findByIdAndUpdate(
      req.params.id,
      { $set: { name, email } },
      { new: true }
    );
    if (!user) return res.status(404).json("User not found");
    const token = helpers.generateAuthToken(user);
    return res.json(token);
  }
);

const updatePassword = asyncMiddleware(
  async (
    req: Request<types.RequestParams, unknown, types.UpdatePassword>,
    res: Response
  ) => {
    const { currentPassword, newPassword } = req.body;
    const user = await model.User.findById(req.params.id);
    if (!user) return res.status(400).json("User not found");
    const isValid = await helpers.validateHash(
      currentPassword,
      user?.hash as string
    );
    if (!isValid) return res.status(400).json("Invalid password");
    const hash = await helpers.generateHash(newPassword);
    await model.User.findByIdAndUpdate(req.params.id, { $set: { hash } });
    return res.json("Password successfully updated");
  }
);

const deleteUser = asyncMiddleware(async (req: Request, res: Response) => {
  const user = await model.User.findByIdAndRemove(req.params.id);
  if (!user) return res.status(404).json("User not found");
  return res.json(user);
});

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updatePassword,
  deleteUser,
};
