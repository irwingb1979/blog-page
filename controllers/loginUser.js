const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = async (req, res) => { // Make the function async
    const { username, password } = req.body;

    try {
        // Find the user using async/await
        const user = await User.findOne({ username: username });

        if (user) {
            // Compare passwords using async/await
            const same = await bcrypt.compare(password, user.password);

            if (same) { // if passwords match
                // store user session (e.g., req.session.userId = user._id;)
                // We'll assume you'll implement session management here later
                req.session.userId = user._id; // Store user ID in session
                res.redirect('/');
            } else {
                // Passwords do not match
                res.redirect('/auth/login');
            }
        } else {
            // User not found
            res.redirect('/auth/login');
        }
    } catch (error) {
        // Handle any errors that occur during finding the user or comparing passwords
        console.error('Error during login process:', error);
        res.redirect('/auth/login'); // Redirect to login on any error
    }
};