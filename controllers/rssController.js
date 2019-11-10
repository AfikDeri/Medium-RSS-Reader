const { getFeedByName } = require('../helpers/medium');

let historySearches = [];

exports.search = async (req, res) => {
    let feed;
    const term = req.query.term;

    try {
        if (!term) {
            throw new Error('Input is invalid');
        }

        feed = await getFeedByName(term);
    } catch (error) {
        return res.json({success: false});
    }

    if (feed.length) {
        addHistoryItem(term);
    }

    res.json({
        success: true,
        historySearches,
        feed
    });
};

exports.getHistry = (req, res) => {
    res.json({historySearches});
}

function addHistoryItem(term) {
    if (historySearches.includes(term)) {
        return;
    }

    if (historySearches > 4) {
        historySearches = historySearches.slice(Math.max(historySearches.length - 4, 0));
    }

    historySearches.push(term);
}
