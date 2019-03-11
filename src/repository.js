const lodash = require('lodash');

const users = require('./data/users.json');
const requests = require('./data/requests.json');
const sites = require('./data/sites.json');


class Repository {
  constructor(collection) {
    this.collection = collection;
  }

  find(query) {
    return lodash.find(this.collection, model => lodash.isMatch(model, query))
  }

  filter(query) {
    return lodash.filter(this.collection, model => lodash.isMatch(model, query))
  }
}

module.exports = {
  user: new Repository(users),
  request: new Repository(requests),
  site: new Repository(sites),
};
