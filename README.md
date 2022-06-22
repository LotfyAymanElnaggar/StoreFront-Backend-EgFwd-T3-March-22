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
- db-migrate up
- npm run dev


Can run test suits by `npm run test`

To Understand how endpoint going on please read `REQUIREMENTS.md`