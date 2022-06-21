CREATE TABLE IF NOT EXISTs users (
    id SERIAL PRIMARY Key,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(50) NOT NULL
);