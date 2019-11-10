const fetch = require('node-fetch');
const { promisify } = require('es6-promisify');
const parseString = require('xml2js').parseString;
const get = require('lodash/get');

exports.getFeedByName = async (name) => {
    const feedXml = await fetchFeed(name),
        parse = promisify(parseString),
        feed = await parse(feedXml);

    return get(feed, 'rss.channel[0].item', []);
};

function fetchFeed(name) {
    return new Promise((resolve, reject) => {
        fetch(`http://medium.com/feed/${name}`)
            .then(res => res.text().catch(err => reject(err)))
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
}
