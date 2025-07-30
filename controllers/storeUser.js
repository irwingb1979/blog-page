// controllers/storeUser.js
const User = require('../models/User');
const bcrypt = require('bcrypt'); // Assuming you're hashing passwords here
const axios = require('axios'); // Install axios: npm install axios

module.exports = async (req, res) => {
    try {
        const { username, password } = req.body;
        const recaptchaToken = req.body['g-recaptcha-response']; // This is the token from reCAPTCHA

        // 1. Verify reCAPTCHA token with Google
        if (!recaptchaToken) {
            req.flash('validationErrors', ['Please complete the reCAPTCHA verification.']);
            return res.redirect('/auth/register');
        }

        const verificationURL = `https://www.google.com/recaptcha/api/siteverify`;
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;

        const response = await axios.post(verificationURL, null, { // Use null for data for application/x-www-form-urlencoded
            params: {
                secret: secretKey,
                response: recaptchaToken,
                remoteip: req.ip // Optional: for added security
            }
        });

        const { success, 'error-codes': errorCodes } = response.data;

        if (!success) {
            console.log('reCAPTCHA verification failed:', errorCodes);
            req.flash('validationErrors', ['reCAPTCHA verification failed. Please try again.']);
            return res.redirect('/auth/register');
        }

        // 2. If reCAPTCHA is successful, proceed with user creation
        // Hash the password before saving (assuming you do this here or in a pre-save hook)
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        const user = await User.create({
            username: username,
            password: hashedPassword // Save the hashed password
        });

        console.log('User created successfully:', user);
        res.redirect('/');

    } catch (error) {
        console.error('Error during user registration or reCAPTCHA verification:', error);

        // You should have a way to pass validation errors or general errors to the view
        // For example, if using connect-flash (as per previous context):
        if (error.code === 11000) { // MongoDB duplicate key error (for unique username)
             req.flash('validationErrors', ['Username already exists.']);
        } else {
             req.flash('validationErrors', ['An unexpected error occurred. Please try again.']);
        }
        res.redirect('/auth/register');
    }
};