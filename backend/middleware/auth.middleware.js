const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const User = require('../models/user.model');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = await User.findById(decoded.id);
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }
      if (req.user.isBlocked && req.originalUrl.includes('comment')) {
        return res.status(403).json({ error: 'User is blocked from commenting' });
      }
      next();
    } catch (err) {
      res.status(401).send({ error: 'Please authenticate.' });
    }
  };  

module.exports = authMiddleware;