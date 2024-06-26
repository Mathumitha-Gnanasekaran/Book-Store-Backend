import Book from "../model/bookModel.js";

export const create = async (req, res) => {
  const { title, author, published_date, isbn, price } = req.body;

  if (
    !title ||
    typeof title !== "string" ||
    title.length < 3 ||
    title.length > 255
  ) {
    return res.status(400).json({
      message: "Title must be a string between 3 and 255 characters long",
    });
  }
  if (
    !author ||
    typeof author !== "string" ||
    author.length < 3 ||
    author.length > 255
  ) {
    return res.status(400).json({
      message: "Author must be a string between 3 and 255 characters long",
    });
  }
  if (!published_date || isNaN(Date.parse(published_date))) {
    return res
      .status(400)
      .json({ message: "Published date must be a valid date" });
  }
  if (!isbn || isNaN(Number(isbn))) {
    return res.status(400).json({ message: "ISBN must be a number" });
  }
  if (!price || typeof price !== "number" || price <= 0) {
    return res
      .status(400)
      .json({ message: "Price must be a number greater than 0" });
  }

  try {
    const bookData = new Book({
      ...req.body,
      published_date: new Date(req.body.published_date),
    });
    const { title } = bookData;

    const bookExist = await Book.findOne({ title });
    if (bookExist) {
      return res.status(400).json({ message: "Book already exists." });
    }
    const savedBook = await bookData.save();
    res.status(200).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: "Error in Create Book." });
  }
};

export const fetch = async (req, res) => {
  try {
    let { page, limit, author, startDate, endDate } = req.body;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 10;

    const skip = (page - 1) * limit;

    let query = {};
    if (author) {
      query.author = { $regex: new RegExp(author, "i") };
    }
    if (startDate || endDate) {
      query.published_date = {};
      if (startDate) {
        query.published_date.$gte = new Date(startDate);
      }
      if (endDate) {
        query.published_date.$lte = new Date(endDate);
      }
    }

    const books = await Book.find(query).skip(skip).limit(limit);

    if (books.length === 0) {
      return res.status(404).json({ message: "Books not found." });
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Fetch error." });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const bookExist = await Book.findOne({ _id: id });
    if (!bookExist) {
      return res.status(404).json({ message: "Book not Found" });
    }
    const updateBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updateBook);
  } catch (error) {
    res.status(500).json({ error: "Error in Update Book." });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const bookExist = await Book.findOne({ _id: id });
    if (!bookExist) {
      return res.status(404).json({ message: "Book not Found" });
    }
    await Book.findByIdAndDelete(id);
    res.status(201).json({ message: "Book deleted Successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error in Detele Book." });
  }
};
