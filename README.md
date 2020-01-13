# Phoenix-project

**Authors**: 
1. Ahmad K.
2. Qusay H.
3. Rashid S.
4. Raed R. 

**Version**: 0.0.1

## Overview
Behind the Script is a Full-stack web Application, that focuses on Movies and Books lovers, the application is designed in a way that the user have the ability to search for a movie or a book, using two APIs which are mentioned in details and with a test API json response. and gives the user the ability to create a Favorite list for both movies and books using local DB, while ensuring the data is is Normalized. The Favorite list is changeable by Deleting items and updated the items, also the user can check if a movie is based in a book or the other way around.

## Getting Started
Jan/8/2020 
the first line of code is written for the web application with the intention to create a Full-Stack web Application. 

## Architecture
1. Js.
2. CSS. 
3. EJS.
4. nodeJS.
5. jQuery library.

## Change Log

no change logs yet.

## WireFrames 

https://wiresketch.com/QYZkyNGk/newscreen

## Domain Modeling

https://drive.google.com/open?id=1Gpt80WRk7ZcwxrZjA_b5Evt2cx0z9OMH

## user stories 

it is done using Trello the link of the Board:

https://trello.com/b/8ReFrR3H/project-behind-the-script


## API 
1. omdbAPI: 

{
"Title": "Inception",
"Year": "2010",
"Rated": "PG-13",
"Released": "16 Jul 2010",
"Runtime": "148 min",
"Genre": "Action, Adventure, Sci-Fi, Thriller",
"Director": "Christopher Nolan",
"Writer": "Christopher Nolan",
"Actors": "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy",
"Plot": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
"Language": "English, Japanese, French",
"Country": "USA, UK",
"Awards": "Won 4 Oscars. Another 152 wins & 209 nominations.",
"Poster": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
"Ratings": [
{
"Source": "Internet Movie Database",
"Value": "8.8/10"
},
{
"Source": "Rotten Tomatoes",
"Value": "87%"
},
{
"Source": "Metacritic",
"Value": "74/100"
}
],
"Metascore": "74",
"imdbRating": "8.8",
"imdbVotes": "1,902,038",
"imdbID": "tt1375666",
"Type": "movie",
"DVD": "07 Dec 2010",
"BoxOffice": "$292,568,851",
"Production": "Warner Bros. Pictures",
"Website": "N/A",
"Response": "True"
}

2. googleAPI:

{
"kind": "books#volume",
"id": "yl4dILkcqm4C",
"etag": "RdXEL+bX7Jw",
"selfLink": "https://www.googleapis.com/books/v1/volumes/yl4dILkcqm4C",
"volumeInfo": {
"title": "The Lord of the Rings",
"subtitle": "One Volume",
"authors": [
"J.R.R. Tolkien"
],
"publisher": "Houghton Mifflin Harcourt",
"publishedDate": "2012-02-15",
"description": "A PBS Great American Read Top 100 Pick One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell by chance into the hands of the hobbit Bilbo Baggins. From Sauron's fastness in the Dark Tower of Mordor, his power spread far and wide. Sauron gathered all the Great Rings to him, but always he searched for the One Ring that would complete his dominion. When Bilbo reached his eleventy-first birthday he disappeared, bequeathing to his young cousin Frodo the Ruling Ring and a perilous quest: to journey across Middle-earth, deep into the shadow of the Dark Lord, and destroy the Ring by casting it into the Cracks of Doom. The Lord of the Rings tells of the great quest undertaken by Frodo and the Fellowship of the Ring: Gandalf the Wizard; the hobbits Merry, Pippin, and Sam; Gimli the Dwarf; Legolas the Elf; Boromir of Gondor; and a tall, mysterious stranger called Strider. This new edition includes the fiftieth-anniversary fully corrected text setting and, for the first time, an extensive new index. J.R.R. Tolkien (1892-1973), beloved throughout the world as the creator of The Hobbit, The Lord of the Rings, and The Silmarillion, was a professor of Anglo-Saxon at Oxford, a fellow of Pembroke College, and a fellow of Merton College until his retirement in 1959. His chief interest was the linguistic aspects of the early English written tradition, but while he studied classic works of the past, he was creating a set of his own.",

## Credits and Collaborations
1. wiresketch:  https://wireframesketcher.com 
