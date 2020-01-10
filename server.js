'use strict';
require('dotenv').config();
const express = require('express');
const server = express();
const cors = require('cors');
const methodOverride = require('method-override');

const superagent = require('superagent');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);

const PORT = process.env.PORT || 3000;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
var request = require("request");


server.use(express.urlencoded({ extended: true }));
server.use(methodOverride('_method'));
server.set('view engine', 'ejs')
server.use(express.static('./public'));

server.get('/',homePage)
server.get('/movie', getAllMovies);
server.post('/searchMovie', getMovieData);
server.get('/search', showing);
server.post('/add', processAddMovie);
server.get('/movies/:movie_id', getSpecificMovie);
server.delete('/delete/:movie_id', deleteMovie);
server.put('/update/:movie_id', updateMovie);

function showing(req,res){
res.render('pages/search')
}
function homePage(req,res){
    res.render('pages/index')
}
function updateMovie (req,res){
    let {title,image_url, overview, released_on, description} = req.body
    let SQL = 'UPDATE movie SET title=$1, image_url=$2, overview=$3, released_on=$4, description=$5 WHERE id=$6;';
    let values = [title,image_url, overview, released_on, description, req.params.movie_id];
    client.query(SQL,values)
    .then(res.redirect('/movie'))
    .catch(err => handleError(err));
}

function getSpecificMovie(req, res) {
    let SQL = `SELECT * FROM movie WHERE id=$1`;
    let id = req.params.movie_id;
    let values = [id];
    client.query(SQL, values)
        .then(data => {
            // console.log(data.rows)
            res.render('pages/detaiMoviel', { movie: data.rows[0] });
        }).catch(err => handleError(err));
}
function deleteMovie(req, res) {
    let SQL = 'DELETE FROM movie WHERE id=$1';
    let values = [req.params.movie_id];
    client.query(SQL, values)
        .then(res.redirect('/movie'))
        .catch(err => handleError(err));
}

function processAddMovie(req, res) {
    let {title,image_url, overview, released_on, description} = req.body
    let SQL = `INSERT INTO movie (title, image_url, overview, released_on, description) VALUES ($1, $2, $3, $4, $5)`
    let values = [title,image_url, overview, released_on, description]
    // console.log(values)


    client.query(SQL, values)
        .then(() => {
            res.redirect('/movie');
        }).catch(err => handleError(err));
}

function getMovieData(req,res){
        const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&language=en-US&query=${req.body.input}&page=1&include_adult=false`
         superagent.get(moviesUrl)
            .then((moviesData) => {
                // console.log(moviesData.body);
                const movies = moviesData.body.results.map((data) => new Movies(data));   
                res.render('pages/showMovieResult', {movies:movies});
            });   
}

function Movies(data){
    this.title = data.title;
    this.overview = data.overview;
    this.average_votes = data.vote_average;
    this.total_votes = data.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
    this.popularity = data.popularity;
    this.released_on = data.release_date;
}
function getAllMovies (req,res){
    let SQL = `SELECT * FROM movie;`;
    client.query(SQL)
        .then(data => {
            res.render('pages/favouriteMovie', { moviesList: data.rows });
        }).catch(err => hanleError(err));
    }
    //////////////////////// BOOK /////////////////////////////
    server.post('/searchIfBook', searcheIfBook);
    server.post('/addBook', processAddBook);
    server.get('/book', getAllBooks);
    server.get('/books/:book_id', getSpecificBook);
    server.put('/updatebook/:book_id', updateBook);
    server.delete('/deletebook/:book_id', deleteBook);
    server.get('/favorit', favoritBM)
    server.post('/searchBook',searcheBook)

    function favoritBM(req,res){
        res.render('pages/everything')      
    }
    function updateBook(req,res){
    let { image_url, title, author, description, isbn, bookshelf } = req.body
    let SQL = 'UPDATE book SET image_url=$1, title=$2, author=$3, description=$4, isbn=$5, bookshelf=$6 WHERE id=$7;';
    let values = [image_url, title, author, description, isbn, bookshelf, req.params.book_id];
    client.query(SQL,values)
    .then(res.redirect('/book'))
    .catch(err => handleError(err));
}
    function deleteBook(req, res) {
    let SQL = 'DELETE FROM book WHERE id=$1';
    let values = [req.params.book_id];
    client.query(SQL, values)
        .then(res.redirect('/book'))
        .catch(err => handleError(err));
}
function getSpecificBook(req, res) {
    let SQL = `SELECT * FROM book WHERE id=$1`;
    let id = req.params.book_id;
    let values = [id];
    client.query(SQL, values)
        .then(data => {
            // console.log(data.rows)
            res.render('pages/detailBook', { book: data.rows[0] });
        }).catch(err => handleError(err));
}
    function getAllBooks(req, res) {
        let SQL = `SELECT * FROM book;`;
        client.query(SQL)
            .then(data => {
                res.render('pages/favouriteBook', { booksList: data.rows });
            }).catch(err => hanleError(err));
    }
    function processAddBook(req, res) {
        // console.log(req.body)
        let { image_url, title, author, description, isbn, bookshelf } = req.body
        let SQL = `INSERT INTO book (image_url, title, author, description, isbn, bookshelf) VALUES ($1, $2, $3, $4, $5, $6)`
        let values = [image_url, title, author, description, isbn, bookshelf]
    
        client.query(SQL, values)
            .then(() => {
                res.redirect('/book');
            }).catch(err => handleError(err));
    }

    function searcheIfBook(req, res) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${req.body.title}`;
        superagent.get(url)
            .then(data => {
                let jsaonData = data.body.items;
                let book = jsaonData.map(data => new Book(data));
                res.render('pages/showBookResult', { books: book });
            })
    }
    function searcheBook(req, res) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${req.body.select}+${req.body.input}`;
        superagent.get(url)
            .then(data => {
                let jsaonData = data.body.items;
                let book = jsaonData.map(data => new Book(data));
                res.render('pages/showBookResult', { books: book });
            })
    }
    function Book(data) {
        this.title = data.volumeInfo.title ? data.volumeInfo.title : "No Title Available";
        this.image_url = (data.volumeInfo.imageLinks && data.volumeInfo.imageLinks.thumbnail) ? data.volumeInfo.imageLinks.thumbnail : "https://i.imgur.com/J5LVHEL.jpg";
        this.author = data.volumeInfo.authors ? data.volumeInfo.authors : "No Authors";
        this.description = data.volumeInfo.description ? data.volumeInfo.description : "No description available";
     
    }
////////////////////////////////////////////////////////////
function handleError(error, response) {
        response.render('pages/error', { error: error });
    }
    let message = "SORY YOU HAVE DO A MISTAKE"
    server.get('*', (req, res) => {
        res.status(404).render('./pages/error', { 'message': message })
    });
    
    client.connect()
        .then(() => {
        server.listen(PORT, () => console.log(`server listen to ${PORT} port`));
    }).catch(err => handleError(err));