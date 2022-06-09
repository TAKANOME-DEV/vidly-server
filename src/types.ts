import { Types } from "mongoose";
import Stripe from "stripe";

export interface Movies {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface MovieInt {
  _id?: Types.ObjectId | undefined;
  genre: Genre;
  title: string;
  overview: string;
  dateRelease: string;
  url: string;
  genreId?: string;
  numberInStock: number;
  dailyRentalRate: number;
  voteAverage: number;
  category: "trending" | "popular";
}

export interface Image {
  url: string;
}

export interface MoviesRequest {
  page: number;
  id: number;
  query: string;
}

export interface MoviesResponse {
  dates: { maximum: string; minimum: string };
  page: number;
  results: Movies[];
  total_pages: number;
  total_results: number;
}

export interface GenresResponse {
  genres: { id: string; name: string }[];
}

export interface Bookmark {
  user: { id: string; name: string };
  bookmarks: { movieId: string; date?: Date }[];
}

export interface BookmarkRequest {
  userId: string;
  movieId: string;
}

export interface Customer {
  name: string;
  phone: string;
  isGold?: boolean;
}

export interface Favorite {
  user: { id: string; name: string };
  favorites: { movieId: string; date?: Date }[];
}

export interface FavoriteRequest {
  userId: string;
  movieId: string;
}

export interface Feedback {
  subject: string;
  message: string;
  username?: string;
  email?: string;
}

export interface Genre {
  id?: Types.ObjectId;
  name: string;
}

export interface JwtPayload {
  _id?: string;
  name?: string;
  email?: string;
  isAdmin?: boolean;
  imageUrl?: string;
  iat?: number;
}

export interface RequestParams {
  [key: string]: string;
}

export interface PaymentRequest {
  userId: string;
  movieId: string;
  returnedDate: string;
}

export type PaymentIntentConfirmation =
  | { paymentIntent: Stripe.PaymentIntent; error?: undefined }
  | { paymentIntent?: undefined; error: Stripe.StripeError };

export interface Payment {
  paymentId: string;
  userId: string;
  movieId: string;
  amount: number;
  client_secret: string;
  createAt: number;
  status: string;
}

export interface Rental {
  user: {
    _id: string;
    name: string;
  };
  rentals: {
    movieId: string;
    rentDate: Date;
    returnedDate: Date;
    rentalFee: number;
    status: string;
  }[];
}

export interface RentalRequest {
  returnedDate: Date;
  movieId: string;
  userId: string;
  paymentIntentId: string | undefined;
}

export interface User {
  _id?: Types.ObjectId;
  name?: string;
  email: string;
  password: string;
  hash?: string;
  isAdmin?: boolean;
  imageUrl?: string;
  imageId?: string;
  createAt?: Date;
}

export interface UpdatePassword {
  currentPassword: string;
  newPassword: string;
}
