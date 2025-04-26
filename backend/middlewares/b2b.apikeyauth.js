// API key authentication middleware
const apiKeyAuth = async (req, res, next) => {
    try {
      // Get API key from header or query parameter
      const apiKey = req.headers['x-api-key'] || req.query.apiKey;
      
      if (!apiKey) {
        return res.status(401).json({
          success: false,
          message: 'API key is required'
        });
      }
      
      // For development purposes only - replace with real validation in production
      if (apiKey !== process.env.B2B_API_KEY && apiKey !== 'test-api-key') {
        return res.status(401).json({
          success: false,
          message: 'Invalid API key'
        });
      }
      
      // Add partner info to request if needed
      // req.partner = { id: 'partner-id', name: 'Partner Name' };
      
      next();
    } catch (error) {
      console.error('API key authentication error:', error);
      return res.status(500).json({
        success: false,
        message: 'API authentication error'
      });
    }
  };
  
  export default apiKeyAuth;