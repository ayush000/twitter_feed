const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const Twit = require('twit');
const socket_io = require('socket.io');
const mysql = require('mysql');
const config = require('config');

const writeLog = require('./commonfunction').writeLog;

const connection = mysql.createConnection({
    host: config.get('mysql').host,
    user: config.get('mysql').user,
    password: config.get('mysql').password,
    database: config.get('mysql').database,
    charset: 'utf8mb4',
});

const app = express();
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')));
}

// TODO: Move these tokens to environment variables
const T = new Twit({
    consumer_key: 'ZKavl18S3M8LtUwYdcgzbGfb2',
    consumer_secret: 'Cg7pskImqWRQq0nmqALHjocrHrJ9mELztJp6yezLILDcdS5vUA',
    access_token: '62252281-6IySVa4ElrX3Foi5oZeYFuKZQU5qNzTHeWhY9SOh2',
    access_token_secret: 'M6mlAcraqLm38FQQwvVrBb6nsSreIyiySljwE7023GoSw',
});

const listener = app.listen(process.env.PORT || 3001, () => {
    writeLog(`Listening on port ${listener.address().port}`);
});


const io = socket_io(listener);

io.on('connection', function (socket) {
    // writeLog(`A user just connected: ${socket.id}`);

    socket.on('hashtag', (hashtag) => {
        // Kill earlier running stream
        if (socket.stream) {
            socket.stream.stop();
        }
        // Keep a reference in socket so that we can kill it when another event is fired by same user
        socket.stream = T.stream('statuses/filter', { track: `#${hashtag}` });
        socket.stream.on('tweet', function (tweet) {
            const text = tweet.text;
            socket.emit('tweet', text);

            connection.query('INSERT INTO tweets (tweet, hashtag) VALUES (?, ?) ON DUPLICATE KEY UPDATE tweet=?, hashtag=?',
                [text, hashtag, text, hashtag],
                (err) => {
                    if (err) writeLog(err);
                });
        });
    });
    socket.on('disconnect', () => {
        // writeLog(`User just disconnected: ${socket.id}`);
        if (socket.stream) {
            socket.stream.stop();
            delete socket.stream;
            // writeLog('stream removed');
        }
    });
});




