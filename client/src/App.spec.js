import React from 'react';
import { mount, shallow } from 'enzyme';
import { feed, history } from './stubs';

import App from './App';
import Feed from './components/Feed';
import SearchForm, { validateInput } from './components/SearchForm';

const feedProps = {
    loading: false,
    items: [],
    term: ''
};

const formProps = {
    onSearchRequest: () => null,
    loading: false,
    history: []
};

describe('RSS Reader', () => {
    let wrapper;

    describe('App', () => {
        it('Renders the component', () => {
            wrapper = mount(<App/>);

            expect(wrapper.find('.rss-reader')).toHaveLength(1);
            expect(wrapper.find('.search-form')).toHaveLength(1);
        });
    });

    describe('SearchForm', () => {
        describe('validateInput function', () => {
            it ('does not allow empty values', () => {
                expect(validateInput('')).toEqual('Search term is required');
            });

            it ('does not allow spaces or special chars', () => {
                expect(validateInput('asda sdfsdf')).toEqual('No spaces or special characters allowed');
                expect(validateInput('sdfs$#dfsd')).toEqual('No spaces or special characters allowed');
            });

            it ('returns null when input is valid', () => {
                expect(validateInput('@something')).toEqual(null);
            });
        });

        it('Triggers the onSearchRequest on form submit', () => {
            const onSearchRequest = jest.fn();
            wrapper = mount(<SearchForm {...formProps} onSearchRequest={onSearchRequest}/>);
            wrapper.find('input').simulate('change', {target: {value: 'some-name'}});
            wrapper.find('form').simulate('submit');

            expect(onSearchRequest).toHaveBeenCalled();
        });

        it('does not show a list of history searches if empty', () => {
            wrapper = mount(<SearchForm {...formProps}/>);

            expect(wrapper.find('.history-searches')).toHaveLength(0);
        });

        it('shows a list of history searches for each term', () => {
            const newProps = Object.assign({}, formProps, {history});
            wrapper = mount(<SearchForm {...newProps}/>);

            expect(wrapper.find('.history-searches li')).toHaveLength(history.length);
        });
    });

    describe('Feed', () => {
        it('shows an empty feed on first load', () => {
            wrapper = shallow(<Feed {...feedProps}/>);

            expect(wrapper.find('.feed-items')).toHaveLength(0);
        });

        it('has a feed item for each article', () => {
            const newProps = Object.assign({}, feedProps, {items: feed});
            wrapper = mount(<Feed {...newProps}/>);

            expect(wrapper.find('.feed-item')).toHaveLength(feed.length);
        });

        it('shows no results text when no items exists for this term', () => {
            const newProps = Object.assign({}, feedProps, {term: 'something-without-results'});
            wrapper = mount(<Feed {...newProps}/>);

            expect(wrapper.find('.not-found')).toHaveLength(1);
        });
    });
});
