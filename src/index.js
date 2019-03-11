/**
 *  Copyright (c) 2015-present, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

const express = require('express');
const graphqlHTTP = require('express-graphql');
const GraphQL = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = GraphQL.buildSchema(`
  type Query {
    hello: String
    user(name: String!): User
    users: [User!]
  }

  type User {
    name: String!
    userAgent: String!
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => 'Hello world!',
  user: (args) => {
    console.log('FIRST', a);
    return {
      name: 'Henk',
      userAgent: 'Bllaaaaa',
    }
  },
  users: () => {
    return [{
      name: 'Henk',
      userAgent: 'Bllaaaaa',
    }]
  }
};

var app = express();
app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');