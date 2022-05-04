// import dataUri from "datauri";
import mongoose from "mongoose";
import supertest from "supertest";
import helpers from "../../../helpers/auth";
import model from "../../../models/user";
import { app } from "../../../server";
import { User } from "../../../types";

// const imagePath = `${__dirname}/../../../assets/images/nodejs.png`;
// const gifPath = `${__dirname}/nodejs.gif`;
const request = supertest(app);

describe("Route /api/profile", () => {
	let token: string;
	let user: Omit<User, "password">;
	// let image: string;

	beforeEach(() => {
		user = {
			_id: new mongoose.Types.ObjectId(),
			name: "User11",
			email: "user11@gmail.com",
			hash: "user11_hash",
		};
		token = helpers.generateAuthToken(new model.User(user));
		// image = (await dataUri(imagePath)) as string;
	});
	const exec = () => request.post("/api/profile").set("X-Auth-Token", token);

	/**
	 * @method POST
	 * @access Private
	 * @return 401 if user is not logged in
	 * @return 400 if uploaded file is not an image
	 * @return 400 if user is not found
	 * @should update user imageUrl and return 200 if valid
	 */

	it("should return 401 if user is not logged in", async () => {
		token = "";
		const res = await exec();
		expect(res.status).toBe(401);
		expect(res.body).toMatch(/access denied/i);
	});

	// it("should return 400 if uploaded file is not an image", async () => {
	// 	image = (await dataUri(gifPath)) as string;
	// 	const res = await exec();
	// 	expect(res.status).toBe(400);
	// 	console.log("upload response :", res.body);
	// 	expect(res.body).toMatch(/image files are allowed/i);
	// });
});
