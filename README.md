# Bookstore API

## Overview

This is a simple RESTful API for managing a collection of books. It allows you to create, read, update, and delete books. The API is built with Node.js, Express, and MongoDB.

## Dependencies

- uuid

## Installation

1. Clone the repository:
   bash
   git clone https://github.com/Mathumitha-Gnanasekaran/Book-Store-Backend.git
   cd Book-Store-Backend

2. Install the dependencies:
   bash
   npm install

## Running the Server

1. Start the server:
   bash
   npm start

2. The server will start on port 8000 by default. You can access it at:

   http://localhost:8000

## Application Structure

- `index.js`: Main entry point of the application.
- `model/bookModel.js`: Mongoose schema and model for the book data.

## API Endpoints

### Create a Book

- _URL:_ http://localhost:8000/api/books/create
- _Method:_ POST
- _Body:_

  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "published_date": "2024-01-01",
    "isbn": "1234567890",
    "price": 19.99
  }

### Fetch a Book

- _URL:_ http://localhost:8000/api/books/getAllBooks
- _Method:_ GET
- _Send_
- _Get All Data_
- _Body:_

  ```json
  {
      "page" : 1, //if you dont provide, it will be get default for pagination
      "limit" : 10, //if you dont provide, it will be get default for pagination
      "author" : "kalki", //(optional), if need use author filter
      "startDate" : "2024-06-27T10:30:00.000Z", //(optional), if need use published_date filter
      "endDate" : "2024-06-30T10:30:00.000Z" //(optional), if need use published_date filter
      //filtering using date range
  }


### Update a Book

- _URL:_ http://localhost:8000/api/books/update/${id}
- _Method:_ PUT
- _Body:_

  ```json
  {
    "title": "title Update",  //(optional)
    "author": "author update", //(optional)
    "published_date": "2024-06-29T10:30:00.000Z", //(optional)
    "isbn": 1111, //(optional)
    "price": 2222 //(optional)
  }

### Delete a Book

- _URL:_ http://localhost:8000/api/books/delete/${id}
- _Method:_ DELETE
