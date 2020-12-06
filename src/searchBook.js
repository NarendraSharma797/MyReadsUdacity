// @flow
import React from "react";
import { Link } from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import "./App.css";

class SearchPage extends React.Component {
  state = {
    query: "",
    books: []
  };


  updateQuery = (query) => {
    this.setState({
      query: query
    });
    if (query) {
      this.searchBook(query);
    } else {
      this.setState({
        books: []
      });
    }
  };

  updateBooks(books) {
    const updatedBooks = books.map(book => {
      book.shelf = "none";
      this.props.booksOnShelf.forEach(bookOnShelf => {
        if (book.id === bookOnShelf.id) {
          book.shelf = bookOnShelf.shelf;
        }
      });
      return book;
    });
    this.setState({
      books: updatedBooks
    });
  }

  searchBook(query) {
    BooksAPI.search(query, 20).then(
      response => {
        if (response.error) {
          this.setState({
            books: []
          });
        } else {
            // console.log(response)
          this.updateBooks(response);
        }
      },
      error => {
        console.log("error ocurred");
      }
    );
  }

  updateBookOFromSearch(book , shelf) {
    let bookState = this.state.books;
    const bookToBeAdded = bookState.filter(item => item.id === book.id)[0];
    bookToBeAdded.shelf = shelf;
    this.setState({
      books: bookState
    });
    this.props.onChangeShelf(book, shelf);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(book =>
              <li key={book.id} className="book">
                <div className="book-top">
                    {book.imageLinks &&
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}
                  />}
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf}
                      onChange={e => {
                        this.updateBookOFromSearch(book, e.target.value);
                      }}
                    >
                      <option value="none" disabled>
                        Move to...
                      </option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">
                  {book.title}
                </div>
                {book.authors &&
                  <div className="book-authors">
                    {book.authors[0]}
                  </div>}
              </li>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchPage;