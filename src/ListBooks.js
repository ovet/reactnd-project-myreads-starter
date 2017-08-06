import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  handleChange=(e) => {
    if(this.props.onUpdateShelf){
      var target = document.getElementById(e.target.value.id);
      var shelf = target.options[target.selectedIndex].value;
      this.props.updateShelf(e.target.value, shelf)
    }
  }

  render() {
    const { books, onUpdateShelf } = this.props

    let allBooks

    allBooks = {
      'Currently Reading': books.filter((book) => book.shelf==='currentlyReading'),
      'Want To Read': books.filter((book) => book.shelf==='wantToRead'),
      'Read': books.filter((book) => book.shelf==='read')
    }

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(allBooks).map((key, index) => ( 
              <div key={index} className="bookshelf">
                <h2 className="bookshelf-title">{key}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {allBooks[key].map((book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{
                              width: 128, height: 193,
                              backgroundImage: `url(${book.imageLinks.thumbnail})`
                            }}></div>
                            <div className="book-shelf-changer">
                              <select id={book.id} value={book.shelf} onChange={() => onUpdateShelf(book)} >
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
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks