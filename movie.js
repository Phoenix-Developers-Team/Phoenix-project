'use strict';

// require the superagent in order to can get the data from API
const superagent = require('superagent');
// get the API key from env file to use it in the movie API
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
// Our database client. We'll use this to run queries
const database = require('./dataBase.js');
const url = require('url')
// this function is make an update procces for movie
function updateMovie(req, res) {
    let { title, image_url, overview, released_on, description } = req.body
    let SQL = 'UPDATE movie SET title=$1, image_url=$2, overview=$3, released_on=$4, description=$5 WHERE id=$6;';
    let values = [title, image_url, overview, released_on, description, req.params.movie_id];
    database.query(SQL, values)
        .then(res.redirect('/movie'))
        .catch(error => { throw error; });
}
// this function is show detaile for specific movie
function getSpecificMovie(req, res) {
    let SQL = `SELECT * FROM movie WHERE id=$1`;
    let id = req.params.movie_id;
    let values = [id];
    database.query(SQL, values)
        .then(data => {
            res.render('pages/detaiMoviel', { movie: data.rows[0] });
        }).catch(error => { throw error; });
}
// this function is make a delete for movie
function deleteMovie(req, res) {
    let SQL = 'DELETE FROM movie WHERE id=$1';
    let values = [req.params.movie_id];
    database.query(SQL, values)
        .then(res.redirect('/movie'))
        .catch(error => { throw error; });
}
// this function is added movie to favourite   
function processAddMovie(req, res) {
    let { mainTitle, title, image_url, overview, released_on, description } = req.body;
    let SQL_1 = `SELECT * FROM movie WHERE image_url=$1;`
    let value = [image_url]
    console.log("asdasdsadsadsadsad");
    database.query(SQL_1, value)
        .then(data => {
            console.log(req.body);
            if (data.rows.length == 0) {
                // res.redirect('/search');
                // res.redirect(req.get('referer'))           
                console.log('1')
                let values = [title, image_url, overview, released_on, description]
                let SQL = `INSERT INTO movie (title, image_url, overview, released_on, description) VALUES ($1, $2, $3, $4, $5);`
                database.query(SQL, values)
                    .then(() => {
                        console.log('we are in if', mainTitle);
                        // res.render('pages/showMovieResult',{movies:req.body});
                        // res.redirect(`/search`);
                        handleSearchedData(mainTitle)
                            .then(data => {
                                console.log(data);
                                res.render('pages/showMovieResult', { movies: data, mainTitle: mainTitle })
                            })
                        // res.redirect('back');
                        // res.redirect(`/searchMovie`,{query:req.body.mainTitle} );
                        // res.redirect(url.format({
                        //     pathname:'/searchMovie?input=',
                        //     query:req.body.mainTitle
                        // }))
                        // res.redirect('/add');
                    })
            } else {
                console.log('we are in else', mainTitle)
                // res.redirect(`/search`);
                handleSearchedData(mainTitle)
                    .then(data => {
                        console.log(data);
                        res.render('pages/showMovieResult', { movies: data, mainTitle: mainTitle })
                    })

                // res.redirect('back');
                // res.render('pages/showMovieResult',{movies:req.body});
                // res.redirect(`/searchMovie`);
                // res.redirect(url.format({
                //     pathname:'/searchMovie?input=',
                //     query:req.body.mainTitle
                // }))
            }

        })
}
// })    .catch(error => { throw error; });

function handleSearchedData(keyword) {
    const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`;
    console.log(moviesUrl);
    return superagent.get(moviesUrl)
        .then(moviesData => {
            const movies = moviesData.body.results.map((data) => new Movies(data));
            // res.render('pages/showMovieResult',{movies:movies,mainTitle:req.body.input})
            return movies;
        });
}


// this function is search for a movie
function getMovieData(req, res) {
    console.log("asdasdsadsad", req.body)
    const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&language=en-US&query=${req.body.input}&page=1&include_adult=false`
    superagent.get(moviesUrl)
        .then((moviesData) => {
            const movies = moviesData.body.results.map((data) => new Movies(data));
            // res.render('pages/showMovieResult', { movies: movies,mainTitle:req.body.input });
            let SQL = `INSERT INTO search_history (image_url,date)VAlUES($1,$2) `
            let values = [movies[0].image_url, new Date()]
            database.query(SQL, values)
                .then(() => {
                    res.render('pages/showMovieResult', { movies: movies, mainTitle: req.body.input })
                })
        });
}

function getIFMovieData(req, res) {
    console.log(req.body.title)
    const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&language=en-US&query=${req.body.title}&page=1&include_adult=false`
    superagent.get(moviesUrl)
        .then((moviesData) => {
            const movies = moviesData.body.results.map((data) => new Movies(data));
            res.render('pages/showMovieResult', { movies: movies, mainTitle: req.body.input });
        });
}
// constuction function for movie  
function Movies(data) {
    this.title = data.title;
    this.overview = data.overview;
    this.average_votes = data.vote_average;
    this.total_votes = data.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
    this.popularity = data.popularity;
    this.released_on = data.release_date;
}
// this function is show all favourite movies
function getAllMovies(req, res) {
    let SQL = `SELECT * FROM movie;`;
    database.query(SQL)
        .then(data => {
            res.render('pages/favouriteMovie', { moviesList: data.rows });
        }).catch(error => { throw error; });
}
// exporets these data to send them to server.js file
module.exports = { getAllMovies, getMovieData, processAddMovie, getSpecificMovie, deleteMovie, updateMovie, getIFMovieData };