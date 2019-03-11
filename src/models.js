const repository = require('./repository');

class User {
  constructor({ mostVisitedSite, ...args }) {
    this.mostVisitedSiteName = mostVisitedSite;
    Object.assign(this, args);
  }

  mostVisitedSite() {
    const site = repository.site.find({ name: this.mostVisitedSiteName });
    return new Site(site)
  }

  requests() {
    const reqs = repository.request.filter({ user: this.name});
    return reqs.map(data => new Request(data));
  }
}

class Site {
  constructor(args) {
    Object.assign(this, args);
  }

  requests() {
    const reqs = repository.request.filter({ site: this.name});
    return reqs.map(data => new Request(data));
  }
}

class Request {
  constructor({ user, site, ...args }) {
    this.userName = user;
    this.siteName = site;
    Object.assign(this, args);
  }

  user() {
    const user = repository.user.find({ name: this.userName });
    return new User(user)
  }

  site() {
    const site = repository.site.find({ name: this.siteName });
    return new Site(site)
  }
}

module.exports = {
  User, Site, Request
}
