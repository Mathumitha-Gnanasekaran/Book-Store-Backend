import express from "express";
import {
  fetch,
  create,
  update,
  deleteBook,
} from "../controller/bookController.js";

const route = express.Router();

route.post("/create", create);
route.get("/getAllBooks", fetch);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteBook);

export default route;