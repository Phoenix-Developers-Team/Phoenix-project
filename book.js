'use strict';
// require the superagent in order to can get the data from API
const superagent = require('superagent');
// Our database client. We'll use this to run queries
const database = require('./dataBase.js');
// this function is make an update procces for book
function updateBook(req, res) {
    let { image_url, title, author, description, isbn, bookshelf } = req.body
    let SQL = 'UPDATE book SET image_url=$1, title=$2, author=$3, description=$4, isbn=$5, bookshelf=$6 WHERE id=$7;';
    let values = [image_url, title, author, description, isbn, bookshelf, req.params.book_id];
    database.query(SQL, values)
        .then(res.redirect('/book'))
        .catch(error => { throw error; });
}
// this function is make a delete for book
function deleteBook(req, res) {
    let SQL = 'DELETE FROM book WHERE id=$1';
    let values = [req.params.book_id];
    database.query(SQL, values)
        .then(res.redirect('/book'))
        .catch(error => { throw error; });
}
// this function is show detaile for specific book
function getSpecificBook(req, res) {
    let SQL = `SELECT * FROM book WHERE id=$1`;
    let id = req.params.book_id;
    let values = [id];
    database.query(SQL, values)
        .then(data => {
            res.render('pages/detailBook', { book: data.rows[0] });
        }).catch(error => { throw error; });
}
// this function is show all favourite books
function getAllBooks(req, res) {
    let SQL = `SELECT * FROM book;`;
    database.query(SQL)
        .then(data => {
            res.render('pages/favouriteBook', { booksList: data.rows });
        }).catch(error => { throw error; });
}


function processAddBook(req, res) {
    let { mainSelect, mainTitle, image_url, title, author, description, isbn, bookshelf } = req.body
    let SQL_1 = `SELECT * FROM book WHERE image_url=$1;`
    let value = [image_url]
    database.query(SQL_1, value)
        .then(data => {
            if (data.rows.length == 0) {
                let values = [image_url, title, author, description, isbn, bookshelf]
                let SQL = `INSERT INTO book (image_url, title, author, description, isbn, bookshelf) VALUES ($1, $2, $3, $4, $5, $6)`
                database.query(SQL, values)
                    .then(() => {
                        res.redirect(`/searchBook?input=${mainTitle}&select=${mainSelect}`);
                    })
            } else {
                res.redirect(`/searchBook?input=${mainTitle}&select=${mainSelect}`);
            }
        })   
}

// this function is added book to favourite
// function processAddBook(req, res) { 
//     let { image_url, title, author, description, isbn, bookshelf } = req.body
//     let SQL = `INSERT INTO book (image_url, title, author, description, isbn, bookshelf) VALUES ($1, $2, $3, $4, $5, $6)`
//     let values = [image_url, title, author, description, isbn, bookshelf]
//     database.query(SQL, values)
//     .then(() => {
//         res.redirect(`/book`);
//     })     .catch(error => { throw error; });
// }
// this function is search if there is a book for this movie
function searcheIfBook(req, res) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${req.body.title}`;
    superagent.get(url)
        .then(data => {
            let jsaonData = data.body.items;
            let book = jsaonData.map(data => new Book(data));
            res.render('pages/showBookResult', { books: book,mainTitle:req.body.input,mainSelect:req.body.select });
        })
}
// this function is search for a book 
function searcheBook(req, res) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${req.query.select}+${req.query.input}`;
    superagent.get(url)
        .then(data => {
            let jsaonData = data.body.items;
            let book = jsaonData.map(data => new Book(data));
            res.render('pages/showBookResult', { books: book,mainTitle:req.query.input,mainSelect:req.query.select });
        })
}
// constuction function for book
function Book(data) {
    this.title = data.volumeInfo.title ? data.volumeInfo.title : "No Title Available";
    this.image_url = (data.volumeInfo.imageLinks && data.volumeInfo.imageLinks.thumbnail) ? data.volumeInfo.imageLinks.thumbnail : "https://i.imgur.com/J5LVHEL.jpg";
    this.author = data.volumeInfo.authors ? data.volumeInfo.authors : "No Authors";
    this.description = data.volumeInfo.description ? data.volumeInfo.description : "No description available";
}
// exporets these data to send them to server.js file
module.exports = { searcheIfBook, searcheBook, processAddBook, getAllBooks, getSpecificBook, deleteBook, updateBook };