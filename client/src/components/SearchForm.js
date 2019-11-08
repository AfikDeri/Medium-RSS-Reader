import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HistorySuggestions from './HistorySuggestions';

export function validateInput(value) {
    if (!value) {
        return 'Search term is required';
    }

    if (!/^[@]?[a-zA-Z0-9-]+$/.test(value)) {
        return 'No spaces or special characters allowed';
    }

    return null;
}

function SearchForm({history, onSearchRequest, loading}) {
    const [value, setValue] = useState('');
    const [error, setError] = useState('')

    const historyItemClicked = (term) => {
        setValue(term);
        onSearchRequest(term);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const error = validateInput(value);

        if (error) {
            setError(error);
            return;
        }

        setError('');
        onSearchRequest(value);
    };

    return (
        <div className="search-form">
            <form onSubmit={onSubmit}>
                <input type="text"
                    placeholder="Enter a Medium feed name..."
                    value={value}
                    onChange={e => setValue(e.target.value)}/>
                <button disabled={loading}
                    type="submit">
                    SEARCH
                </button>
                {!!error && <p className="error">{error}</p>}
            </form>
            <HistorySuggestions items={history} onItemClick={historyItemClicked}/>
        </div>
    );
}

SearchForm.propTypes = {
    history: PropTypes.array.isRequired,
    onSearchRequest: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default SearchForm;
