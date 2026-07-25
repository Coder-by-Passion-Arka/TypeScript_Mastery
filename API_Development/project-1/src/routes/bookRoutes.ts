import {Router} from "express";
import { getAllBooksController, getBookController} from "../controllers/bookController.ts";

const bookRouter = Router();

// get all the books present in the database
bookRouter.get("/get-all-books", getAllBooksController);

// get a specific book present in the database
bookRouter.get("/get-book/:id", getBookController);