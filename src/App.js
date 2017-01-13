import React from 'react';
import './App.css';

import { message } from 'antd';
import { baseURL } from './constants';
import SearchField from './SearchField';
import Tweets from './Tweets';
import io from 'socket.io-client';
const socket = io(`${baseURL}`);


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      tweets: [],
    };
  }

  handleSearch = (value) => {
    // const initUrl = `${baseURL}/getTweets/${value}`;
    message.info('Process started. Tweets will now appear');
    socket.emit('hashtag', value);
    socket.emit('stop_prev');
    // const socket = io(`${baseURL}/${value}`);
    // fetch(initUrl).then((response) => {
    //   if (response.status >= 200 && response.status < 400) {
    //     message.info('Process started. Tweets will now appear');

    //   } else {
    //     const error = new Error(response.statusText);
    //     error.response = response;
    //     throw error;
    //   }
    // });
  }

  componentDidMount() {
    socket.on('tweet', (text) => {
      // console.log(`received ${text}`);
      const arr = this.state.tweets.slice();
      arr.unshift(text);
      this.setState({
        tweets: arr,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <SearchField handleSearch={this.handleSearch} />
          <Tweets tweets={this.state.tweets} />
        </div>
      </div>
    );
  }
}

export default App;
