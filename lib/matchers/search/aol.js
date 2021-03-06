
var querystring = require('querystring');

module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.host.indexOf('aol.com') !== -1) {
    var description = { type: 'search', engine: 'aol' };
    var qs = querystring.parse(referrer.query);
    var query = qs.q || qs.encquery || qs.query;
    if (query) description.query = query;
    return callback(null, description);
  } else {
    return callback(null, false);
  }

};