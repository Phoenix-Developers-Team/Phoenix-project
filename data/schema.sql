DROP TABLE IF EXISTS book, movie;

CREATE TABLE book (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    isbn VARCHAR(255),
    image_url VARCHAR(255),
    description TEXT,
    bookshelf VARCHAR(255)
);

CREATE TABLE movie (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    image_url VARCHAR(255),
    overview VARCHAR(255),
    released_on VARCHAR(255),
    description TEXT
);
