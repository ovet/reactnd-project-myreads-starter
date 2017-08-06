import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends Component {
  static propTypes = {
    onUpdateShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    showingBooks: []
  }

  updateQuery = (query, showingBooks) => {
    this.setState({ query: query.trim() })
    try{
      BooksAPI.search(query, 20).then((showingBooks) => {
        this.setState({ showingBooks: showingBooks })
      })
    } catch(e) {
      this.setState({ showingBooks: [] })
    }
  }

  render() {
    const { query } = this.state.query
    const { onUpdateShelf } = this.props
    var showingBooks = this.state.showingBooks

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type='text'
              placeholder='Search by title or author'
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
      if (showingBooks){
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{
                      width: 128, height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={() => onUpdateShelf(book)} >
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.author}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      }
      </div>
    )
  }
}

export default SearchBooks