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
        console.log('error', error);
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

    historySearches.unshift(term);

    if (historySearches.length > 5) {
        historySearches.pop();
    }
}
