DROP TABLE IF EXISTS book, movie;

CREATE TABLE book (
    id SERIAL PRIMARY KEY,
    title VARCHAR(2083),
    author VARCHAR(2083),
    isbn VARCHAR(2083),
    image_url VARCHAR(2083),
    description TEXT,
    bookshelf VARCHAR(2083)
);

CREATE TABLE movie (
    id SERIAL PRIMARY KEY,
    title VARCHAR(2083),
    image_url VARCHAR(2083),
    overview VARCHAR(2083),
    released_on VARCHAR(2083),
    description TEXT
);
