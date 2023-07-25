const Video = require('../model/video')
const { google } = require('googleapis');

const apiKeys = [process.env.YOUTUBE_TOKEN,process.env.YOUTUBE_TOKEN_one,process.env.YOUTUBE_TOKEN_two,process.env.YOUTUBE_TOKEN_three];
let currentApiKeyIndex = 0;
let currentApiKey =apiKeys[currentApiKeyIndex];
const fetchLatestVideos = async () => {
    try {
      const response = await google.youtube('v3').search.list({
         key:process.env.YOUTUBE_TOKEN,
         auth:process.env.YOUTUBE_TOKEN,
         part:'snippet',
         q:'joji',
         order: 'date',
         type: 'video',
         maxResults: 10,
      })
  
      // Extract relevant video data
      const videos = response.data.items.map((item) => {
        return {
          videoId: item.id.videoId,
          title: item.snippet.title,
          description:item.snippet.description||'No description available',
          publishedAt:item.snippet.publishedAt,
          thumbnails:item.snippet.thumbnails || {}
        };
      });
  
      // Save the video data to the database
      await Video.insertMany(videos);
      console.log('Videos saved to the database');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 403 && error.response.data.error.errors[0].reason === 'quotaExceeded') {
        currentApiKeyIndex = (currentApiKeyIndex + 1) % apiKeys.length;
        currentApiKey = apiKeys[currentApiKeyIndex]; 
        console.log(`Switched to API key: ${currentApiKey}`);
      }
    }
  };
  
  module.exports = fetchLatestVideos