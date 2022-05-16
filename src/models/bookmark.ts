import { model, Schema } from "mongoose";
import * as types from "../types";

const Bookmark = model<types.Bookmark>(
  "Bookmark",
  new Schema<types.Bookmark>({
    user: {
      type: new Schema({
        name: {
          type: String,
          required: true,
        },
      }),
      required: true,
    },
    bookmarks: {
      type: [
        {
          _id: false,
          movieId: String,
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      required: true,
    },
  })
);

export default {
  Bookmark,
};
