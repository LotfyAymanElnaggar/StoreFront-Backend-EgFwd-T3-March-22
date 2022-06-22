# API Requirements

## Users End Points
<table>
<tr>
<td> Endpoint </td>
<td> HTTP verb </td>
<td> Request Body </td>
<td> Response Body </td>
</tr>
<tr>
<td> /users/authenticate

`Authenticate`</td> <td>POST</td>

<td>

```json
{
  "username": "lotfy",
  "password": "0123456789"
}
```

</td>

<td>

```json
{
  "status": "success",
  "data": {
    "token": "...",
    "id": "...",
    "username": "Lotfy",
    "fullname": "Lotfy Ayman"
  },
  "message": "User Authenticated Successfully"
}
```

 </td>
</tr>
<tr>
<td> /users

`Create new user`</td> <td>POST</td>

<td>

```json
{
  "username": "Lotfy",
  "fullname": "Lotfy Ayman",
  "password": "1234"
}
```

</td>

<td>

```json
{
  "status": "success",
  "data": {
    "id": "...",
    "username": "Lotfy",
    "fullname": "Lotfy Ayman"
  },
  "message": "User Created Successfully"
}
```

 </td>
</tr>

<tr>
<td> /users

`Get All Users`

**token required**
</td> <td>GET</td>

<td>

```
No Body
```

</td>

<td>

```json
{
    "status": "success",
    "data": {
        "users": [
            {
                "id": "...",
                "username": "Lotfy",
                "fullname": "Lotfy Ayman"
            }
        ]
    },
    "message": "Users Fetched Successfully"
}
```
 </td>
</tr>

<tr>
<td> /users/:id

`Get By ID`

**token required**
</td> <td>GET</td>

<td>

```
No Body
```
</td>

<td>

```json
{
    "status": "success",
    "data": {
        "id": "...",
        "username": "Lotfy",
        "fullname": "Lotfy Ayman"
    },
    "message": "Users Fetched Successfully"
}
```
 </td>
</tr>

<tr>
<td> /users/:id

`Update By ID`

**token required**
</td> <td>PATCH</td>

<td>

```json
{
    "username": "Lotfy",
    "fullname": "Lotfy Ayman",
    "password": "1234"
}
```
</td>

<td>

```json
{
    "status": "success",
    "data": {
        "id": "...",
        "username": "Lotfy",
        "fullname": "Lotfy Ayman"
    },
    "message": "User Updated Successfully"
}
```
 </td>
</tr>


<tr>
<td> /users/:id

`Delete By ID`

**token required**
</td> <td>DELETE</td>

<td>

```
No Body
```
</td>

<td>

```json
{
    "status": "success",
    "data": {
        "id": "...",
        "username": "Lotfy",
        "fullname": "Lotfy Ayman"
    },
    "message": "User Deleted Successfully"
}
```
 </td>
</tr>
</table>


## Orders End Points

<table>
<tr>
<td> Endpoint </td>
<td> HTTP verb </td>
<td> Request Body </td>
<td> Response Body </td>
</tr>

<tr>
<td> /orders

`Create new orders`

**token required**
</td> <td>POST</td>

<td>

```json
{
    "status": "open",
    "user_id": "...",
}
```

</td>

<td>

```json
{
    "status": "success",
    "data": {
        "id": 10,
        "user_id": "5a37a0c2-96f1-436c-8fe3-daaaf78308c7",
        "status": "open"
    },
    "message": "Order Fetched Successfully"
}
```

 </td>
</tr>

<tr>
<td> /orders

`Get All Orders`

**token required**
</td> <td>GET</td>

<td>

```
No Body
```

</td>

<td>

```json
{
    "status": "success",
    "data": {
        "id": 10,
        "user_id": "5a37a0c2-96f1-436c-8fe3-daaaf78308c7",
        "status": "open"
    },
    "message": "Order Created Successfully"
}
```
 </td>
</tr>

<tr>
<td> /orders/:id

`Get By ID`

**token required**
</td> <td>GET</td>

<td>

```
No Body
```
</td>

<td>

```json
{
    "status": "success",
    "data": {
        "id": 10,
        "user_id": "5a37a0c2-96f1-436c-8fe3-daaaf78308c7",
        "status": "open"
    },
    "message": "Order Fetched Successfully"
}
```
 </td>
</tr>

<tr>
<td> /orders/cart

`Update By ID`

**token required**
</td> <td>POST</td>

<td>

```json
{
    "id": 10,
    "status": "open",
    "user_id": "...",
    "productInCart": [ { "pId":2, "pQ": 5 } ]

}
```
</td>

<td>

```json
{
    "status": "success",
    "data": {
        "order_id": 10,
        "cart": [
            {
                "id": 1,
                "product_id": 2,
                "quantity": 5
            },
            {
                "id": 2,
                "product_id": 3,
                "quantity": 7
            }
        ]
    },
    "message": "Order Updated Successfully"
}
```
 </td>
</tr>


<tr>
<td> /users/:id

`Delete By ID`

**token required**
</td> <td>DELETE</td>

<td>

```
No Body
```
</td>

<td>

```json
{
    "status": "success",
    "data": {
        "id": 1,
        "title": "test product2",
        "price": "20.20"
    },
    "message": "Product Deleted Successfully"
}
```
 </td>
</tr>
</table>
## Products End Points
<table>
<tr>
<td> Endpoint </td>
<td> HTTP verb </td>
<td> Request Body </td>
<td> Response Body </td>
</tr>

<tr>
<td> /products

`Create new product`

**token required**
</td> <td>POST</td>

<td>

```json
{
  "title": "Product 1",
  "price": 20.75,
}
```

</td>

<td>

```json
{
    "status": "success",
    "data": {
        "id": 1,
        "title": "Product 1",
        "price": "20.75"
    },
    "message": "Product Created Successfully"
}
```

 </td>
</tr>

<tr>
<td> /products

`Get All Products`

**token required**
</td> <td>GET</td>

<td>

```
No Body
```

</td>

<td>

```json
{
    "status": "success",
    "data": {
        "products": [
            {
                "id": 1,
                "title": "Product 1",
        "price": "20.75"
            }
        ]
    },
    "message": "Products Fetched Successfully"
}
```
 </td>
</tr>

<tr>
<td> /products/:id

`Get By ID`

**token required**
</td> <td>GET</td>

<td>

```
No Body
```
</td>

<td>

```json
{
    "status": "success",
    "data": {
        "id": 1,
        "title": "Product 1",
        "price": "20.75"
    },
    "message": "Product Fetched Successfully"
}
```
 </td>
</tr>

<tr>
<td> /products/:id

`Update By ID`

**token required**
</td> <td>PATCH</td>

<td>

```json
{
    "title": "test product2",
    "price": 20.2
}
```
</td>

<td>

```json
{
    "status": "success",
    "data": {
        "id": 1,
        "title": "test product2",
        "price": "20.20"
    },
    "message": "Product Updated Successfully"
}
```
 </td>
</tr>


<tr>
<td> /users/:id

`Delete By ID`

**token required**
</td> <td>DELETE</td>

<td>

```
No Body
```
</td>

<td>

```json
{
    "status": "success",
    "data": {
        "id": 1,
        "title": "test product2",
        "price": "20.20"
    },
    "message": "Product Deleted Successfully"
}
```
 </td>
</tr>
</table>

## Database Schema

### User Table Schema

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTs users (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(50) NOT NULL
);
```

### Products Table Schema

```sql
CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price NUMERIC(5,2) NOT NULL
);
```

### Orders Table Schema

```sql
CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    status VARCHAR(255) NOT NULL
);
```

### Cart Table Schema

```sql
CREATE TABLE cart(
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    quantity INTEGER NOT NULL
);
```
