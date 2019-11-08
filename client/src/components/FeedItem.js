import React, { useState } from 'react';
import AnimateHeight from 'react-animate-height';

function FeedItem({data}) {
    const [extended, setExtended] = useState(false);

    const getContentField = () => {
        if (data['content:encoded']) {
            return data['content:encoded'];
        }

        if (data.description) {
            return data.description[0];
        }

        return '';
    };

    const getLink = () => {
        if (data.link) {
            return data.link[0];
        }

        return '#!';
    }

    const readMoreText = extended ? 'Read less' : 'Read more...';

    return (
        <div className="feed-item">
            <div className="content-header">
                <div className="title">{data.title[0]}</div>
                <button onClick={() => setExtended(!extended)}>{readMoreText}</button>
            </div>
            <div className="author">
                <strong>By</strong> {data['dc:creator'][0]}, <strong>Published on</strong> {data.pubDate[0]}
                <a className="visit-medium"
                    href={getLink()}
                    target="_blank"
                    rel="noopener noreferrer">
                    Visit article
                </a>
            </div>
            <AnimateHeight duration={ 500 } height={ extended ? 'auto' : 150 }>
                <div className="content" dangerouslySetInnerHTML={{ __html: getContentField()}}></div>
            </AnimateHeight>
        </div>
    );
}

export default FeedItem;
