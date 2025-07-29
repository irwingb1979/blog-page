const User = require('../models/User');

// Make the middleware function async
module.exports = async (req, res, next) => {
    try {
        // Use await with User.findById()
        const user = await User.findById(req.session.userId);

        // Check for error or if user is not found
        if (!user) { // user will be null if not found, or there might be a database error caught by the try/catch
            return res.redirect('/');
        }
        
        // If user is found, proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Catch any errors that occur during the database query
        console.error('Error in auth middleware:', error);
        return res.redirect('/'); // Redirect to home on any database error
    }
}