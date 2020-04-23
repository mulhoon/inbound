

var url           = require('url'),
    querystring   = require('querystring'),
    _             = require('underscore'),
    async         = require('async'),
    matchers      = require('./matchers');

/**
 * Parses a location href and document referrer
 * into semantic information about how that visitor
 * got to the page.
 * @param  {string}   href     Location href, equivalent to window.location.href
 * @param  {string}   referrer Referrer url, equivalent to document.referrer
 * @param  {Function} callback callback(err, in);
  * where "in" is a object containing referrer and campaign information
  * about this inbound visitor.
 */
var parse = exports.parse = function parse(href, referrer, callback) {

  var parsedHref     = url.parse(href || '');
  var parsedReferrer = url.parse(referrer || '');

  // referrers
  let results = []
  let campaign = null
  const cb = (err,result) => {
    results.push(result)
  }
  for(var i in matchers){
    matchers[i](parsedHref, parsedReferrer, cb)
  }
  results = results.filter(item=>item)

  const cb2 = (err,result) => {
    campaign = result
  }
  // campaigns
  parseCampaign(parsedHref, parsedReferrer, cb2)
  results = results.filter(item=>item)

  let obj = {
    referrer:results[0]
  }
  if(campaign){
    obj.campaign = campaign
  }

   callback(null, obj)
   return

};


var campaignKeyMap = {

  'utm_campaign' : 'campaign',
  'utm_source'   : 'source',
  'utm_term'     : 'term',
  'utm_medium'   : 'medium',
  'utm_count'    : 'content'

};

var parseCampaign = function parseCampaign (href, referrer, callback) {
  var query = querystring.parse(href.query);
  var campaign = {};
  _.each(campaignKeyMap, function (ourKey, queryKey) {
    if (queryKey in query) campaign[ourKey] = query[queryKey];
  });
  return callback(null, _.size(campaign) > 0 ? campaign: null);
};
