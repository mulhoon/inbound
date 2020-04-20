var querystring = require('querystring');
var tldextract = require('tld-extract');

module.exports = function (href, referrer, callback) {

    if (!referrer.href || (referrer.host && referrer.host.indexOf('search.yahoo') === -1)) {
        return callback(null, false);
    }

    try {
        const tld = tldextract(referrer.href);
        if (tld.domain.indexOf("yahoo") !== -1 && tld.sub.indexOf("search") !== -1) {
            var description = {type: 'search', engine: 'yahoo'};
            var query = querystring.parse(referrer.query).p;
            if (query) description.query = query;
            return callback(null, description);
        }

    } catch (e) {
        return callback(null, false);
    }

    return callback(null, false);
};