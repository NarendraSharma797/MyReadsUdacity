import React from "react";
import { Route } from "react-router-dom";

import "./App.css";
import SearchBook from "./searchBook";
import ListBooks from "./listBook";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books
      });
    });
  }

  handleChangeShelf = (bookId, shelf) => {
    BooksAPI.update(bookId, shelf).then(response => {
      this.getBooksOnShelf();
    });
  };

  getBooksOnShelf() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => <ListBooks booksOnShelf={this.state.books} />} />
        <Route
          path="/search"
          render={() =>
            <SearchBook onChangeShelf={this.handleChangeShelf} booksOnShelf={this.state.books} />}
        />
      </div>
    );
  }
}

export default BooksApp;
