const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      publishDateTime: {
        type: Date,
        default: null
      },
      thumbnails: {
        type: Object, // You can use Object type for thumbnails
        required: true,
      },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
