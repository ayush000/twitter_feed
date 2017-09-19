First create open your mysql user and run migrate.sql on it to create database and tables. `mysql -u USERNAME -p PASSWORD < ./migrate.sql`
Put your mysql credentials in config/default.config

To start the application, first make sure you are using node 7.4. Install all modules using `npm install`, start server using `npm run dev` and then open `http://localhost:3000` on your web browser.

### Application Development

[![Greenkeeper badge](https://badges.greenkeeper.io/ayush000/twitter_feed.svg)](https://greenkeeper.io/)

Write a script which will fetch tweets of a given “#HashTag” every few minutes and store only the newly found tweets in a database. Develop a front end using which a user can see the tweets for a given “#HashTag”. Front end should be auto-refreshing (like facebook) without reloading the entire page or any other user input. Focus on building a high quality user experience (and not just good looking UI). If possible, please host it somewhere (without spending money).

You should use NodeJS as back-end and Angular or react as fron-tend and MySQL for Database. Timeline: 5-6 hours should be enough for this.