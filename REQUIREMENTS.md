# API Requirements

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

<tr>
<td> /api/login

`Login`</td> <td>POST</td>

<td>
</td>

<td>

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
