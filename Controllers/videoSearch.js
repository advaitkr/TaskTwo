const Video = require("../model");
exports.search = async (req, res) => {
    try {
      const query = req.query.query || ''; 
      const page = parseInt(req.query.page) || 1; 
      const limit = 10; 
  
      const totalCount = await Video.countDocuments({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
        ],
      });
      const totalPages = Math.ceil(totalCount / limit);
      const videos = await Video.find({
        $or: [
          { title: { $regex: query, $options: 'i' } }, 
          { description: { $regex: query, $options: 'i' } }, 
        ],
      })
        .sort({ publishedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
  
      res.json({ videos, totalPages });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  