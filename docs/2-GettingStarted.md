---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

## Installation

Install `sqlmancer`

```bash
npm install sqlmancer
```

You will also need to install the appropriate driver for your database

```bash
# PostgreSQL
npm install pg

# MySQL and MariaDB
npm install mysql2
```

## Supported dialects

* PostgreSQL 9.4+
* MySQL 8.0+ - **COMING SOON!**
* MariaDB 10.2.3+ - **COMING SOON!**

## Define your models

Start by writing your type definitions. Use the `@model` directive to define your data models right in your schema.

```graphql
type Actor @model(table: "actor", pk: "id") {
  id: ID!
  firstName: String!
  lastName: String!
  fullName: String! @depend(on: ["first_name", "last_name"])
  films @join(
    through: 'film_actor',
    on: [{from: "id", to: "actor_id" }, {from: "film_id", to: "id" }]
  ): [Film!]!
}
```

Read more about defining models [here](defining-models).

## Generate your database client

Create a fluent, type-safe database client from your type definitions by running a command like

```
npx sqlmancer generate -d postgres -x SNAKE_CASE -t ./src/schema/*.gql
```

Read more about the available configuration options [here](config). Sqlmancer uses Knex under the hood and requires a Knex instance to initialize a new client instance. Read more about configuring Knex [here](https://knexjs.org/).

```js
const Knex = require('knex');
const { createClient } = require('./generated/sqlmancer');

const knex = new Knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
});
const client = createClient(knex);
```

## Use the client
```js
const resolvers = {
  Query: {
    films: (root, args, ctx, info) => {
      return client.models.Film.findAll().resolveInfo(info).execute()
    },
  },
};
```

Sqlmancer will parse the `GraphQLResolveInfo` object passed to it to determine which columns to select and which associations to load. Read more about the methods available for each model [here](client).

:::tip

If you're using VS Code but not using TypeScript, make sure to [enable type checking in JavaScript](https://code.visualstudio.com/docs/nodejs/working-with-javascript#_type-checking-javascript). The easiest way to do that is to just append "// @ts-check" at the top of your file, but you can configure this feature through VS Code settings or jsconfig.json as well. Turning on type checking will ensure you get the correct IntelliSense suggestions -- notably, it will hide all the private properties and methods that start with an underscore and shouldn't be used anyway.

:::

## Create your schema

In order to utilize Sqlmancer's schema directives, make sure you to add them to your schema.

```js
const { typeDefs, schemaDirectives } = require('sqlmancer');
const { ApolloServer } = require('apollo-server');

const apollo = new ApolloServer({
  typeDefs: [yourTypeDefs, typeDefs],
  resolvers: yourResolvers,
  schemaDirectives: { ...yourSchemaDirectives, ...schemaDirectives },
});
```

Sqlmancer also provides a convenient wrapper around `makeExecutableSchema`:

```js
const { makeSqlmancerSchema } = require('sqlmancer');
const { ApolloServer } = require('apollo-server');

const schema = makeSqlmancerSchema({
  typeDefs: yourTypeDefs,
  resolvers: yourResolvers,
})
const apollo = new ApolloServer({ schema });
```
