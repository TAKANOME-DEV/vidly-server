import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { Types } from "mongoose";
import * as types from "../types";

const validateId = (req: Request, res: Response, next: NextFunction) => {
	if (!Types.ObjectId.isValid(req.params.id))
		return res.status(404).json("Invalid ID");
	return next();
};

const validateRequest =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any

		(validator: (req: any) => Joi.ValidationResult<unknown>) =>
		(req: Request, res: Response, next: NextFunction) => {
			const { error } = validator(req.body);
			if (error) return res.status(400).json(error.details[0].message);
			return next();
		};

const validatePageNumber = (
	req: Request<unknown, unknown, types.MoviesRequest>,
	res: Response,
	next: NextFunction
) => {
	if (!req.body.page) return res.status(400).json("Invalid page number");
	return next();
};

const validateQuery = (
	req: Request<unknown, unknown, types.MoviesRequest>,
	res: Response,
	next: NextFunction
) => {
	if (!req.body.query) return res.status(400).json("Invalid query");
	return next();
};

export default {
	validateId,
	validateRequest,
	validatePageNumber,
	validateQuery,
};
