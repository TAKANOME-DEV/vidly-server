import mongoose from "mongoose";
import helpers from "../../helpers/auth";
import model from "../../models/user";

describe("Auth Helper", () => {
	describe("JWT verification", () => {
		it("should return a valid token", () => {
			const payload = {
				_id: new mongoose.Types.ObjectId(),
				name: "User1",
				email: "user1@gmail.com",
			};
			const user = new model.User(payload);
			const token = helpers.generateAuthToken(user);
			const decoded = helpers.verifyToken(token);
			expect(decoded).toMatchObject(payload);
		});
	});

	describe("Bcrypt Hash", () => {
		it("should return a valid hash", async () => {
			const password = "12345678";
			const hash = await helpers.generateHash(password);
			const validate = await helpers.validateHash(password, hash);
			expect(validate).toBe(true);
		});
	});
});
