import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import Feed from './components/Feed';
import { useMediumApi } from './hooks/mediumApi';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, items] = useMediumApi(searchTerm, setHistory);

    const onSearchRequest = (term) => {
        setSearchTerm(term);
    };

    useEffect(() => {
        fetch('/api/history')
            .then(res => res.json())
            .then(res => setHistory(res.historySearches))
            .catch(err => setHistory([]));
    }, []);

    return (
        <div className="rss-reader">
            <Hero/>
            <div className="container">
                <SearchForm onSearchRequest={onSearchRequest}
                    loading={loading}
                    history={history}/>
                <Feed items={items}
                    loading={loading}
                    term={searchTerm}/>
            </div>
        </div>
    );
}

export default App;
