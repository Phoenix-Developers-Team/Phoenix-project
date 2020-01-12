'use strict';

// Read configurations from the .env file
require('dotenv').config();
// Express server library
const express = require('express');
// Create an server varible using express
const server = express();
// requier the cors from dependencies to make sure how can use your server
const cors = require('cors');
// To convert the metod from post to >> PUT(UBDATE) & DELETE(DELETE) because the HTTP can't understand these method in ejs files.
const methodOverride = require('method-override');
// specific your enviroment work in defined port
const PORT = process.env.PORT || 3000;
// Our database client. Will use this to connect to Postgres
const dataBase = require('./dataBase.js');
// to get the data inserting by user as input by using post method
server.use(express.urlencoded({ extended: true }));
// make the server using this method to make conveting between methods happedneds
server.use(methodOverride('_method'));
// On the server, we'll use EJS to do templates
server.set('view engine', 'ejs')
// Anything static (css or browser-side javascript) should go here
server.use(express.static('./public'));
// get the data from movie.js 
const movie = require('./movie.js');
// get the data from book.js 
const book = require('./book.js');
// The handlers for dealing with 404 (not found) and 500 (errors)
const mistake = require('./error.js');

//     ********** MOVIE ROUTES **********
server.get('/movie', movie.getAllMovies);
server.post('/searchMovie', movie.getMovieData);
server.post('/add', movie.processAddMovie);
server.get('/movies/:movie_id', movie.getSpecificMovie);
server.delete('/delete/:movie_id', movie.deleteMovie);
server.put('/update/:movie_id', movie.updateMovie);
server.post('/searchIfMovie', movie.getIFMovieData);
//     ********** SHOWING SOME PAGES **********
server.get('/', homePage)
server.get('/favorit', favoritBM)
server.get('/search', showing);
function showing(req, res) {
    res.render('pages/search')
}
function homePage(req, res) {
    // let SQL = `SELECT * FROM movie;`;
    // dataBase.query(SQL)
    //     .then(element => {
            let SQL_1 = `SELECT * FROM search_history
                    ORDER BY date DESC
                    LIMIT 4 ;`
                    //select n_num from abc_test group by n_num order by min(k_str)
                dataBase.query(SQL_1)
                .then(data => {
                    console.log(data.rows)
                    res.render('pages/index', {output: data.rows });
                })
            }//.catch(err => hanleError(err));
function favoritBM(req, res) {
    res.render('pages/everything')
}
//      ********** BOOK ROUTES **********
server.post('/searchIfBook', book.searcheIfBook);
server.post('/addBook', book.processAddBook);
server.get('/book', book.getAllBooks);
server.get('/books/:book_id', book.getSpecificBook);
server.put('/updatebook/:book_id', book.updateBook);
server.delete('/deletebook/:book_id', book.deleteBook);
server.post('/searchBook', book.searcheBook);

//     ********** SHOW ERRORS **********
server.use('*', mistake.notFoundHandler);
server.use(mistake.errorHandler);

//     ********** SERVER LISTEN **********
dataBase.connect()
    .then(() => {
        server.listen(PORT, () => console.log(`server listen to ${PORT} port`));
    }).catch(err => console.error(err));

    