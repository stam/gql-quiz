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

const repository = require('./repository');
const { User, Site, Request } = require('./models');


// Construct a schema, using GraphQL schema language
var schema = GraphQL.buildSchema(`
  type Query {
    hello: String
    user(name: String!): User
    users(filter: FilterUser): [User!]
    site(name: String!): Site
    sites: [Site!]
    request: Request
    requests: [Request!]
  }

  type User {
    name: String!
    device: String!
    resolution: String!
    mostVisitedSite: Site
    requests: [Request]
    browser: String!
  }

  type Request {
    user: User!
    site: Site!
    date: String!
  }

  type Site {
    name: String
    url: String
    requests: [Request]
  }

  input FilterUser {
    name: String
    browser: String
  }
`);
// The root provides a resolver function for each API endpoint
var root = {
  hello: () => 'Hello world!',
  user: (args) => new User(repository.user.find(args)),
  users: ({ filter }) => repository.user.filter(filter).map(user => new User(user)),
  site: (args) => new Site(repository.site.find(args)),
  sites: ({ filter }) => repository.site.filter(filter).map(site => new Site(site)),
  request: (args) => new Request(repository.request.find(args)),
  requests: ({ filter }) => repository.request.filter(filter).map(request => new Request(request))
};

var app = express();
app.use('/', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');
