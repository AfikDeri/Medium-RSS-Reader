import { useEffect, useState } from 'react';

export const useMediumApi = (term, setHistory) => {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setLoading(true);

        fetch(`/api/search?term=${term}`)
            .then(res => res.json())
            .then(res => {
                if (!res.success) {
                    setItems([]);
                    return;
                }

                setItems(res.feed);
                setHistory(res.historySearches);
            })
            .catch(err => {
                console.log(err);
                setItems([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [setHistory, term]);

    return [loading, items];
};
