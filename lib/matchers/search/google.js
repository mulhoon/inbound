var querystring = require('querystring');

module.exports = function (href, referrer, callback) {

    if (
        referrer.host && referrer.href &&
        referrer.host.indexOf('google') !== -1 &&
        referrer.host.indexOf('mail.google.com') === -1
    ) {

        var description = {type: 'search', engine: 'google'};
    var query = querystring.parse(referrer.query).q;
    if (query) description.query = query;
    return callback(null, description);
}
else
{
    return callback(null, false);
}

}
;