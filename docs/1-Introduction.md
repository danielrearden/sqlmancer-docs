---
id: introduction
title: Introduction
sidebar_label: Introduction
---

:::caution

This project is still in development. The API is still subject to change and suggestions are welcome. If you find a bug that doesn't already have an open issue, please open one.

:::

<br/>
<center><h3>Conjure SQL from your GraphQL queries 🧙🔮✨</h3></center>

Sqlmancer is a Node.js library for integrating SQL with GraphQL. It empowers you to effortlessly and efficiently translate GraphQL queries into SQL statements.

## How it works

Sqlmancer generates a fluent, type-safe database client from your schema based on metadata you provide through schema directives. With Sqlmancer, your resolver can be as simple as this:

```js
function resolve (root, args, ctx, info) {
  return Film.findMany().resolveInfo(info).execute()
}
```

while still allowing complex queries like this:

```graphql
query FilmQuery {
  films(
    where: {
      or: [
        { budget: { greaterThanOrEqual: 50000000 } },
        { language: { name: { in: ["Spanish", "French"] } } },
      ]
      actors: { count: { lessThan: 50 } },
    },
    orderBy: [{
      actors: { avg: { popularity: DESC } }
    }],
    limit: 100
  ) {
    id
    title
    actors(
      orderBy: [{
        popularity: DESC
      }],
      limit: 10
    ) {
      id
      firstName
      lastName
    }
  }
}
```

## Features
* **Multiple dialect support.** Sqlmancer supports Postgres, MySQL, MariaDB and SQLite, enabling you to incorporate it into existing projects regardless of what flavor of SQL you're using.
* **Robust filtering and sorting.** Add complex filtering and sorting to your queries, including filtering using logical operators and filtering and sorting by fields and aggregate fields of related models.
* **Arbitrarily deep nesting.** Define one-to-one, one-to-many and many-to-many relationships between models. Related models can be filtered, sorted and paginated just like root-level fields.
* **Performance.** Avoid the N+1 problem by building a single SQL query to fetch all necessary data, regardless of query depth.
* **Mutations made easy.** Create, update and delete records, with or without transactions, using a simple, fluent API. Easily provide WHERE, ORDER BY and LIMIT clauses to your queries when updating and deleting records.
* **Views and CTEs.** Take advantage of existing views in your database and create inline ones using common table expressions.
* **Custom scalars.** Use the scalars that make sense for your schema.
* **Abstract types.** Utilize unions and interfaces in your schema using views or single table inheritance.

## Design goals
* **Annotation over transformation.** Sqlmancer aims to be as aspect-oriented as possible, with directives being used mostly to annotate your schema rather than outright change its behavior.
* **Limited type-generation.** Sqlmancer offers a number of convenient directives to generate arguments or types, but these directives are never required for Sqlmancer to work its magic. What types are exposed in the schema is ultimately left up to you.
* **More than just CRUD.** Sqlmancer empowers you to create the queries and mutations that are right for your schema.
* **Flexible and unopinionated.** Sqlmancer enabled you to easily add features like authorization, tracing, cost analysis and depth limits using existing libraries without paying for a "pro" version.
