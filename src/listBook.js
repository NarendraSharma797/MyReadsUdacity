import React from "react";
import { Link } from "react-router-dom";

import Shelf from "./Shelf";

import * as BooksAPI from "./BooksAPI";
import "./App.css";

class ListBook extends React.Component {
  state = {};

  changeShelf = (bookId, e) => {
    let temp = this.props.booksOnShelf;
    const book = temp.filter(t => t.id === bookId)[0];
    book.shelf = e.target.value;
    BooksAPI.update(book, e.target.value).then(response => {
      this.setState({
        books: temp
      });
    });
  };

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelf
            key="currently"
            books={this.props.booksOnShelf.filter(book => book.shelf === "currentlyReading")}
            onChangeShelf={this.changeShelf}
            shelftitle="Currently Reading"
          />
          <Shelf
            key="wantToRead"
            books={this.props.booksOnShelf.filter(book => book.shelf === "wantToRead")}
            onChangeShelf={this.changeShelf}
            shelftitle="Want to Read"
          />
          <Shelf
            key="read"
            books={this.props.booksOnShelf.filter(book => book.shelf === "read")}
            onChangeShelf={this.changeShelf}
            shelftitle="Read"
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}
export default ListBook;