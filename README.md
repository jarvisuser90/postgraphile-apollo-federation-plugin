# postgraphile-apollo-federation-plugin

[![Travis CI](https://img.shields.io/travis/com/jarvisuser90/postgraphile-apollo-federation-plugin/main)](https://github.com/jarvisuser90/postgraphile-apollo-federation-plugin)
[![npm version](https://img.shields.io/npm/v/postgraphile-apollo-federation-plugin)](https://www.npmjs.com/package/postgraphile-apollo-federation-plugin)

Apollo federation support for PostGraphile (or any Graphile Engine schema).

## Installation

```shell
npm install postgraphile-apollo-federation-plugin
```

## CLI usage

```shell
postgraphile --append-plugins postgraphile-apollo-federation-plugin
```

## Library usage

```js
const express = require("express");
const { postgraphile } = require("postgraphile");
const { default: postgraphile-apollo-federation-plugin } = require("postgraphile-apollo-federation-plugin");

const app = express();

app.use(
  postgraphile(process.env.DATABASE_URL, "public", {
    appendPlugins: [postgraphile-apollo-federation-plugin],
  })
);

app.listen(process.env.PORT || 3000);
```

## How?

This plugin exposes the [Global Object Identification
Specification](https://facebook.github.io/relay/graphql/objectidentification.htm)
(i.e. `Node` interface) in a way that's compatible with Apollo Federation.

Requires PostGraphile v4.4.2-rc.0+

## Testing

Docker can be used to spin up a test instance for running Jest tests. The instance will be exposed at port `5432`. See `.env.example` for the exported Postgre connection.

```sh
docker compose up -d
./scripts/test
```

## Do you need this?

Only use this if you're planning to have your API consumed by Apollo
Federation; exposing these redundant interfaces to regular users may be
confusing.

## Status

Proof of concept. No tests, use at your own risk! Pull requests very welcome.
