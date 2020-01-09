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


server.get('/', homePage);
server.post('/search', getMovieData);
server.get('/new', showing);
server.post('/add', processAdd);
// server.put('/edit',edaitSelected);
server.get('/movies/:movie_id', getSpecificMovie);
server.delete('/delete/:movie_id', deleteMovie);
server.put('/update/:movie_id', updateMovie);

// function edaitSelected(req, res) {
//     // console.log(req.body)
//     res.render('pages/new', { movie: req.body })
// }


function showing(req,res){
res.render('pages/search')
}

function updateMovie (req,res){
    let {title,image_url, overview, released_on, description} = req.body
    let SQL = 'UPDATE movie SET title=$1, image_url=$2, overview=$3, released_on=$4, description=$5 WHERE id=$6;';
    let values = [title,image_url, overview, released_on, description, req.params.movie_id];
    client.query(SQL,values)
    .then(res.redirect(`/movies/${req.params.movie_id}`))
    .catch(err => handleError(err));
}

function getSpecificMovie(req, res) {
    let SQL = `SELECT * FROM movie WHERE id=$1`;
    let id = req.params.movie_id;
    let values = [id];
    client.query(SQL, values)
        .then(data => {
            // console.log(data.rows)
            res.render('pages/detail', { movie: data.rows[0] });
        }).catch(err => handleError(err));
}
function deleteMovie(req, res) {
    let SQL = 'DELETE FROM movie WHERE id=$1';
    let values = [req.params.movie_id];
    client.query(SQL, values)
        .then(res.redirect('/'))
        .catch(err => handleError(err));
}

function processAdd(req, res) {
    let {title,image_url, overview, released_on, description} = req.body
    let SQL = `INSERT INTO movie (title, image_url, overview, released_on, description) VALUES ($1, $2, $3, $4, $5)`
    let values = [title,image_url, overview, released_on, description]
    console.log(values)

    client.query(SQL, values)
        .then(() => {
            res.redirect('/');
        }).catch(err => handleError(err));
}



function getMovieData(req,res){
        const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&language=en-US&query=${req.body.input}&page=1&include_adult=false`
         superagent.get(moviesUrl)
            .then((moviesData) => {
                // console.log(moviesData.body);
                const movies = moviesData.body.results.map((data) => new Movies(data));   
                res.render('pages/show', {movies:movies});
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

function homePage (req,res){
    let SQL = `SELECT * FROM movie;`;
    client.query(SQL)
        .then(data => {
            res.render('pages/index', { moviesList: data.rows });
        }).catch(err => hanleError(err));}


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
