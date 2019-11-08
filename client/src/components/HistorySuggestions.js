import React from 'react';
import PropTypes from 'prop-types';

function HistorySuggestions({items, onItemClick}) {
    if (!items.length) {
        return null;
    }

    return (
        <div className="history-searches">
            <h3>Latest searches:</h3>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <button onClick={() => onItemClick(item)}>
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

HistorySuggestions.protoTypes = {
    items: PropTypes.array.isRequired,
    onItemClick: PropTypes.func.isRequired
};

export default HistorySuggestions;
