// controllers/aiController.js
// Handles AI recommendations and semantic archival matching requests

const aiService = require('../services/aiService');

// POST /api/ai/recommend
exports.recommend = async (req, res, next) => {
  try {
    const { interests, region, travelStyle } = req.body;

    if (!interests || !Array.isArray(interests)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an interests array in the request body.'
      });
    }

    const recommendations = await aiService.getRecommendations(interests, region, travelStyle);

    return res.status(200).json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/ai/search
exports.search = async (req, res, next) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search query in the request body.'
      });
    }

    const results = await aiService.searchSites(query);

    return res.status(200).json({
      success: true,
      data: results
    });
  } catch (error) {
    next(error);
  }
};
