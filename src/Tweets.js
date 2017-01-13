import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';

export default class extends React.Component {

    render() {
        const tweets = this.props.tweets;
        return (
            <div>
                {tweets.map((text, i) =>
                    <Card key={tweets.length - i - 1} style={{ fontSize: '3.5vw', marginTop: '10px', textAlign: 'left' }}>{text}</Card>
                )}
            </div>
        );
    }
}