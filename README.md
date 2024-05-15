# Hono Boilerplate

Tech stack: Bun, Hono, typeorm, jsonwebtoken, winston

## Development

To install dependencies:

```sh
bun install
```

Create `.env` file:

```sh
cp example.env .env
```

Fill the value of variables in `.env` file

To run:

```sh
bun dev
```

open http://localhost:3000

## Note

Currently, the typeorm migration and the getting entities using entity path aren't working. So I temporarily set the `synchronize` to true, comment the `migrations` and `entities` using path and use the object `entities`
