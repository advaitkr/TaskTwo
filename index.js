const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Video = require('./model/video')
const path = require('path');
const db = require('./db');
const cron = require('node-cron')
const fetchLatestVideos = require('./Controllers/fetchLatestVideos')
const port = 7000;
require('dotenv').config()
app.use(express.json());
app.use(bodyParser.json());
 const startCronJob = () => {

  cron.schedule('*/10 * * * * *', () => {
    fetchLatestVideos();
  });
};
startCronJob()
  



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });