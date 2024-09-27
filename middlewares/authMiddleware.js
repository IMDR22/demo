const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Split "Bearer <token>"

    if (!token) {
        return res.status(401).json({ Error: 'Access denied, no token provided' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = verified;  // Attach the decoded user info to req.user
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(400).json({ Error: 'Invalid Token' });
    }
};

module.exports = authenticateToken;
