const User = require('../models/User.js')
const path = require('path') // 'path' is not used here, but keeping it if needed elsewhere

module.exports = async (req, res) => { // Make the exported function 'async'
    try {
        const user = await User.create(req.body); // Use await with User.create()
        console.log('User created successfully:', user); // Optional: log for debugging
        res.redirect('/');
    } catch (error) {
        console.error('Error creating user:', error); // Log the error
        // You should handle the error more gracefully for the user
        // e.g., res.status(500).send('Error creating user');
        // Or redirect back to a form with an error message
        const validationErrors = Object.keys(error.errors).map(key => 
            error.errors[key].message);
        // req.session.validationErrors = validationErrors;
        req.flash('validationErrors', validationErrors);
        req.flash('data',req.body); // Store form data in flash for repopulation
        res.redirect('/auth/register'); // Redirect to a registration page on error, or send an error status
    }
}