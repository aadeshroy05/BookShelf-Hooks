import React, { useState, useEffect } from 'react'
import './App.css'
import { getAll, update } from './BookApi'

const MyRead = () => {
    const [Books, setBooks] = useState([]);
    // const [showSearchPage, setShowSearchPage] = useState(false);

    const getBook = async () => {
        try {
            const res = await getAll();
            setBooks(res);
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    const updateBook = async (book, shelf) => {
        try {
            console.log("shelf = ", shelf);
            // console.log(showSearchPage);
            const res = await update(book, shelf);
            getBook();
            console.log(res);
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getBook();
    }, [])

    return (
        <div className="app">
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {Books.map(book => book.shelf === "currentlyReading" &&
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover"
                                                        style={{
                                                            width: 128, height: 193,
                                                            backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                                        }}></div>
                                                    <div className="book-shelf-changer">
                                                        <select value="currentlyReading"
                                                            onChange={(e) => updateBook(book, e.target.value)}>
                                                            <option value="move" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{book.title}</div>
                                                <div className="book-authors">{book.authors.map((author, i) => i === book.authors.length - 1 ? author : author + ", ")}</div>
                                            </div>
                                        </li>)}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {Books.map(book => book.shelf === "wantToRead" &&
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{
                                                        width: 128, height: 193,
                                                        backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                                    }}></div>
                                                    <div className="book-shelf-changer">
                                                        <select
                                                            value="wantToRead"
                                                            onChange={(e) => updateBook(book, e.target.value)}
                                                        >
                                                            <option value="move" disabled>Move to...</option>
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
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {Books.map(book => book.shelf === "read" &&
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{
                                                        width: 128, height: 192,
                                                        backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                                    }}></div>
                                                    <div className="book-shelf-changer">
                                                        <select
                                                            value="read"
                                                            onChange={(e) => updateBook(book, e.target.value)}
                                                        >
                                                            <option value="move" disabled>Move to...</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="read">Read</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{book.title}</div>
                                                <div className="book-authors">{book.authors.map((author, i) => i === book.authors.length - 1 ? author : author + ", ")}</div>
                                            </div>
                                        </li>)}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="open-search">
                    <button onClick={() => setShowSearchPage(true)}>Add a book</button>
                </div> */}
            </div>

        </div>
    )
}
export default MyRead;