const fetch = require('node-fetch');
const { promisify } = require('es6-promisify');
const parseString = require('xml2js').parseString;
const get = require('lodash/get');

exports.getFeedByName = async (name) => {
    try {
        const feedXml = await fetchFeed(name);
        const parse = promisify(parseString);
        const feed = await parse(feedXml);
        return get(feed, 'rss.channel[0].item', []);
    } catch (e) {
        throw Error(e);
    }
};

function fetchFeed(name) {
    return new Promise((resolve, reject) => {
        fetch(`http://medium.com/feed/${name}`)
            .then(res => res.text().catch(err => reject(err)))
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
}
