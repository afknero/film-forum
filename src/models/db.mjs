import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
  title: String,
  description: String,
  rating: Number,
  createdAt: Date
});

const filmSchema = new Schema({
  filmID: Number,
  rating: Number
});

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  reviews: [reviewSchema],
  favorites: [filmSchema],
  createdAt: Date
});

mongoose.model('User', userSchema);

mongoose.connect(process.env.DSN);