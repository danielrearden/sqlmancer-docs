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

# SQLite
npm install sqlite3
```

## Supported dialects

* PostgreSQL 9.4+
* MySQL 8.0+
* MariaDB 10.2.3+
* SQLite 3.9.0+ (with json1 extension)

## Define your models

Start by writing your type definitions. Add the `@sqlmancer` directive to provide any configuration options to the database client. Then, use the `@model` directive to define your data models right in your schema.

```graphql
type Query @sqlmancer(dialect: POSTGRES){
  actors: [Actor!]!
}

type Actor @model(table: "actor", pk: "id") {
  id: ID!
  firstName: String!
  lastName: String!
}
```

Read more about defining models [here](models).

## Create the database client

Sqlmancer uses Knex under the hood and requires a Knex instance to initialize a new client instance. You can read more about configuring Knex [here](https://knexjs.org/). Pass the Knex instance and a [glob pattern](https://github.com/isaacs/node-glob#glob-primer) string matching the location of your type definitions to `createSqlmancerClient`. Your type definitions can be `.graphql` files or JavaScript/TypeScript files.

```js
import Knex from 'knex';
import { createSqlmancerClient } from 'sqlmancer';

const knex = Knex({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
});
const client = createSqlmancerClient('./src/**/*.graphql', knex);
```

:::tip

If you're using TypeScript, you can generate a type for your client instance using the [CLI](cli). This will enable complete typings for both the client methods as well as the results they return.

:::

## Use the client
```js
const resolvers = {
  Query: {
    films: (root, args, ctx, info) => {
      return client.models.Film.findMany().resolveInfo(info).execute()
    },
  },
};
```

Sqlmancer will parse the `GraphQLResolveInfo` object passed to it to determine which columns to select and which associations to load. Read more about the methods available for each model [here](client).

## Create your schema

In order to utilize Sqlmancer's schema directives, you need to add them to your schema. `makeSqlmancerSchema` is a convenient wrapper around `makeExecutableSchema` that does this for you:

```js
import { makeSqlmancerSchema } from 'sqlmancer';
import { ApolloServer } from 'apollo-server';

const schema = makeSqlmancerSchema({
  typeDefs: yourTypeDefs,
  resolvers: yourResolvers,
})
const apollo = new ApolloServer({ schema });
```

If you prefer to add the directives yourself, you may do so as well:

```js
import { typeDefs, schemaDirectives } from 'sqlmancer';
import { ApolloServer } from 'apollo-server';

const apollo = new ApolloServer({
  typeDefs: [yourTypeDefs, typeDefs],
  resolvers: yourResolvers,
  schemaDirectives: { ...yourSchemaDirectives, ...schemaDirectives },
});
```
