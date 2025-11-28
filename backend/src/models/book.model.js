import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  genre: { type: String, required: true, trim: true },
  condition: { type: String, required: true, trim: true },
  coverImage: { type: String, required: true, trim: true },
  description:{ type:String, required:true, trim: true}
}, { timestamps: true });

export const Book = mongoose.model("Book", bookSchema);
