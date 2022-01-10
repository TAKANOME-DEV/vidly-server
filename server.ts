/* eslint-disable @typescript-eslint/no-non-null-assertion */
import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";

import { connectDB } from "./db/db";
import { logger } from "./helpers/logger";
import { movies } from "./routes/movies";
import { genres } from "./routes/genres";
import { customers } from "./routes/customers";
import { rentals } from "./routes/rentals";
import { users } from "./routes/users";
import { auth } from "./routes/auth";
import { errorHandler } from "./middleware/error";

export const app = express();

dotenv.config();
void connectDB();

app.use(helmet());
app.use(express.json());

app.use("/api/movies", movies);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, () =>
    logger.info(
      `Server is listenning in ${process.env.NODE_ENV!} mode on port ${process
        .env.PORT!}`
    )
  );
}
