const fetch = require('node-fetch');
const { promisify } = require('es6-promisify');
const parseString = require('xml2js').parseString;
const get = require('lodash/get');

exports.getFeedByName = async (name) => {
    const feedXml = await fetchFeed(name);

    if (!feedXml) {
        return [];
    }

    const parse = promisify(parseString),
        feed = await parse(feedXml);

    return get(feed, 'rss.channel[0].item', []);
};

function fetchFeed(name) {
    return fetch(`http://medium.com/feed/${name}`)
        .then(res => {
            if (res.ok) {
                return res.text();
            }

            return null;
        })
        .then(res => res)
        .catch(err => err);
}
