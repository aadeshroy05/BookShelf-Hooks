import React, { useState, useEffect } from 'react'
import './App.css'
import { search, update } from './BookApi'

const Search = () => {
    const [term, setTerm] = useState('');
    const [books, setBooks] = useState([]);
    const [shelf, setShelf] = useState('');

    useEffect(() => {
        getBooks('fitness');
    }, [])

    const onInputChange = (e) => {
        setTerm(e.target.value);
    }

    const getBooks = async (term) => {
        try {
            const res = await search(term);
            console.log("From Search response = ", res);
            if (!res.error) {
                setBooks(res);
            } else {
                setBooks([])
                alert(`${term} Books Not Found! `)

            }
        } catch (error) {
            console.log(error)
        }
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        getBooks(term);
    }

    const updateBook = async (book, shelf) => {
        try {
            console.log("shelf = ", shelf);
            const res = await update(book, shelf);
            setShelf('')
            console.log(res);
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="container">
            <div className="search-bar ui segment">
                <form onSubmit={onFormSubmit} className="ui form">
                    <div className="ui fluid action input">
                        <input
                            placeholder="Seach book by Book name"
                            type="text"
                            value={term}
                            onChange={onInputChange}

                        />
                        <button className="ui button" onSubmit={onFormSubmit}>Search</button>
                    </div>

                </form>

                <div className="bookshelf">
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.map(book =>
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover"
                                                style={{
                                                    width: 128, height: 193,
                                                    backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                                }}
                                            ></div>
                                            <div className="book-shelf-changer">
                                                <select value={shelf}
                                                    onChange={(e) => {
                                                        console.log(e.target.value)
                                                        // setShelf(e.target.value);
                                                        updateBook(book, e.target.value)
                                                    }}
                                                >
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="" style={{ visibility: 'hidden', display: 'none' }}></option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors}</div>
                                    </div>
                                </li>)}
                        </ol>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Search;
