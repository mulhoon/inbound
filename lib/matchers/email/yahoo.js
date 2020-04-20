var tldextract = require('tld-extract');

module.exports = function (href, referrer, callback) {

    if (!referrer.href || (referrer.host && referrer.host.indexOf('mail.yahoo') === -1)) {
        return callback(null, false);
    }

    try {
      const tld = tldextract(referrer.href);
      if (tld.domain.indexOf("yahoo") !== -1 && tld.sub.indexOf("mail") !== -1) {
          return callback(null, {
              type: 'email',
              client: 'yahoo',
              from: referrer.href,
              link: href.href
          });
      }
    } catch (e) {
      return callback(null, false);
    }

    return callback(null, false);
};