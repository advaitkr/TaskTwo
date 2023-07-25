const Video = require("../model");
  exports.sortVideos = async(req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 10; // Set the number of videos to return per page
  
    Video.find()
      .sort({ publishedAt: -1 }) // Sort in descending order of published datetime
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray((err, videos) => {
        if (err) {
          console.error('Error fetching videos from the database:', err);
          res.status(500).json({ error: 'An error occurred' });
        } else {
          res.json({ videos });
        }
      });
  };