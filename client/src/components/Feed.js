import React from 'react';
import PropTypes from 'prop-types';
import Loader from './Loader';
import FeedItem from './FeedItem';

function Feed({ term, items, loading }) {
    if (loading) {
        return <Loader/>;
    }

    if (!items.length && term) {
        return <p className="not-found">The feed "{term}" could not be found <span role="img" aria-label="sad">😪</span></p>
    }

    return (
        <div className="feed">
            {!!items.length && <p className="results-for">Showing results for "{term}"</p>}
            {items.map((item, index) => <FeedItem key={index} data={item}/>)}
        </div>
    );
}

Feed.propTypes = {
    term: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default Feed;
