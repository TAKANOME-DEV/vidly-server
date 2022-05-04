import { NextFunction, Request, Response } from "express";
import HttpException from "../helpers/httpException";
import { logger } from "../helpers/logger";

export const errorHandler = (
	err: HttpException,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.error(err.message, err);
	const status = err.statusCode || err.status || 500;
	const message = err.message || "An unexpected error occurred";

	return res.status(status).json(message);
};
