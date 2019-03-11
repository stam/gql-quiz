const lodash = require('lodash');

const collection = [
  {
    name: 'Henk',
    userAgent: 'Blaaaaa',
  },
  {
    name: 'Piet',
    userAgent: 'Piet',
  }
];

class Repository {
  constructor(collection) {
    this.collection = collection;
  }

  find(query) {
    return lodash.find(collection, model => lodash.isMatch(model, query))
  }

  filter(query) {
    // if (lodash.isEmpty(query)) {
    //   return
    // }
    console.log('filter', query);
    return lodash.filter(collection, model => lodash.isMatch(model, query))
  }
}

module.exports = Repository;
