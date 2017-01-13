import React from 'react';
import { Input } from 'antd';
import 'antd/dist/antd.css';

const Search = Input.Search;

export default class extends React.Component {

    render() {
        return (
            <div className="searchContainer">
                <Search placeholder="Enter hashtag to search"
                    size="large"
                    addonBefore="#"
                    onSearch={(value) => { this.props.handleSearch(value); } } />
            </div>
        );
    }
}