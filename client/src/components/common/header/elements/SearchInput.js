import React from 'react';
import { browserHistory } from 'react-router';
let searchUrl = require('assets/ic_Search.png');

class SearchInput extends React.Component {

    constructor (props) {
        super(props);
        this.goToSearch = this.goToSearch.bind(this);
    }

    goToSearch (e) {
        e.preventDefault();
        let queryInput = this.refs.query;
        if (queryInput.value.trim()) {
            const path = `/items?search=${queryInput.value}`;
            browserHistory.push(path);
        }else {
            return;
        }
    }

    render () {
        return (
            <form className="inline" onSubmit = { this.goToSearch }>
                <input type="text" placeholder="Nunca dejes de buscar" ref="query" />
                <button type="submit" className="search-button">
                    <img src={searchUrl} alt="sb"/>
                </button>
            </form>
        );
    };
};

export default SearchInput;
