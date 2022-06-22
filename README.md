# StoreFront-Backend-EgFwd-T3-March-22

To successfully deploy this project

- npm install
- Create instance of .env.example and name it .env or copy this into it

```env
APP_PORT=3000
NODE_ENV='dev'

#DataBase
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB_DEV=
POSTGRES_DB_TEST=

# Hashing Env
BCRYPT_PASSWORD=
SALT_ROUND=

# JWT
JWT_SECRET=
```
- DB Configurations

We shall create the dev and test database.

```sql
psql -U postgres
CREATE USER store_db_user WITH PASSWORD 'password123';
CREATE DATABASE store;
CREATE DATABASE store_test;
\c store
GRANT ALL PRIVILEGES ON DATABASE store TO storeDB;
\c store_test
GRANT ALL PRIVILEGES ON DATABASE store_test TO storeDB;
```

- db-migrate up
- npm run dev


Can run test suits by `npm run test`

To Understand how endpoint going on please read `REQUIREMENTS.md`