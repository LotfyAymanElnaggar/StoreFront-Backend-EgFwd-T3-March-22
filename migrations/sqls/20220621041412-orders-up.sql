CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    status VARCHAR(255) NOT NULL
);