# GQL quiz

An GraphQL server written in NodeJS used for a quiz.

## Getting started
`yarn && yarn start`

## Questions

- What kind of resolution does Bastien have?
```graphql
{
  user(name: "Bastien") {
    name
    resolution
  }
}

```

- What is the URL of the most visited site of Alex?
```graphql
query {
	user(name: "Alex") {
    name
    mostVisitedSite {
      name
      url
    }
  }
}
```

- Who is the most frequent user of the most visited site of the user that uses "curl" as browser?
```graphql
query {
	users(filter: {browser: "curl"}) {
    name
    device
    mostVisitedSite {
      name
      url
      requests {
        user {
          name
        }
      }
    }
  }
}
```
