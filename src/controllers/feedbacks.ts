import { Request, Response } from "express";
import helpers from "../helpers/auth";
import { asyncMiddleware } from "../middleware/async";
import model from "../models/feedback";
import * as types from "../types";

const getFeedbacks = asyncMiddleware(async (req: Request, res: Response) => {
  const feedbacks = await model.Feedback.find();
  return res.json(feedbacks);
});

const postFeedback = asyncMiddleware(
  async (
    req: Request<types.RequestParams, unknown, types.Feedback>,
    res: Response
  ) => {
    let user: types.JwtPayload;
    const token = helpers.getToken(req);

    token === "null"
      ? (user = {})
      : (user = helpers.verifyToken(token!) as types.JwtPayload);

    const { subject, message } = req.body;
    await model.Feedback.create({
      subject,
      message,
      username: user?.name,
      email: user?.email,
    });
    return res.json("Thanks for your feedback!");
  }
);

export default {
  getFeedbacks,
  postFeedback,
};
