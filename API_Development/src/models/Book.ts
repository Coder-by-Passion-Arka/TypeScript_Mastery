import mongoose from "mongoose";

interface Book {
    name: string,
    author: string,
    publishYear?: number,
    description?: string
}

const bookSchema: mongoose.Schema<Book> = new mongoose.Schema<Book>({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishYear: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const bookModel = mongoose.model<Book>('Book', bookSchema);

// const book = new bookModel({
//     name: "Basic",
//     author: "Arka",
//     publishYear: 2021,
//     description: "Something Technically fancy"
// });

export default {
    Book,
    bookModel
};