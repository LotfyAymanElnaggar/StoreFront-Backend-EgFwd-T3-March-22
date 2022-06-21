# API Requirements


## Database Schema

### User Table Schema

```sql
CREATE TABLE IF NOT EXISTs users (
    id SERIAL PRIMARY Key,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(50) NOT NULL
);
```

### Products Table Schema


```sql
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price NUMERIC(5,2) NOT NULL
);
```

### Orders Table Schema
```sql
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    status VARCHAR(255) NOT NULL
);
```
### Cart Table Schema
```sql
CREATE TABLE cart(
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```
