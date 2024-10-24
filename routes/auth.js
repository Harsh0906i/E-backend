const express = require('express');
const router = express.Router();
const app = express();
const userSchema = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorhandler');
const verifyUser = require('../utils/verifyUser');

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists!" });
        }

        // Hash the password and create new user
        const hash = await bcrypt.hash(password, 10);
        const newUser = new userSchema({
            username,
            email,
            password: hash
        });

        // Save the user to the database
        await newUser.save();
        return res.status(201).json({ success: true, message: "User created successfully" });

    } catch (error) {
        // Handle any unexpected errors
        return res.status(500).json({ success: false, message: "An error occurred. Please try again later." });
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const validUser = await userSchema.findOne({ email });
        if (!validUser) {
            return res.status(404).json({ success: false, message: "User not found!" }); // JSON response
        }

        const isPasswordValid = await bcrypt.compare(password, validUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Wrong Credentials" }); // JSON response
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWTSECRET, { expiresIn: '10h' });
        res.status(200).json({ success: true, user: validUser, token }); // Include the token here


    } catch (error) {
        console.error("Sign-in error:", error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' }); // JSON response
    }
});

router.post('/google', async (req, res) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email });
        let token;

        if (user) {
            token = jwt.sign({ id: user._id }, process.env.JWTSECRET, { expiresIn: '10h' });
            return res.status(200).json({ success: true, user, token });
        } else {
            const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hash = await bcrypt.hash(password, 10);
            const googleUser = new userSchema({ username: req.body.name, email: req.body.email, password: hash, avatar: req.body.photo });
            await googleUser.save();

            token = jwt.sign({ id: googleUser._id }, process.env.JWTSECRET, { expiresIn: '10h' });
            return res.status(201).json({ success: true, user: googleUser, token });
        }
    } catch (error) {
        console.error("Google auth error:", error);
        return res.status(500).json({ success: false, message: 'An error occurred during Google authentication.' });
    }
});

router.post("/signout", (req, res) => {
    try {
        res.clearCookie('access_token'); // Clear the cookie
        return res.status(200).json({ success: true, message: "User logged out!" }); // Successful response
    } catch (error) {
        console.error("Logout error:", error); // Log error for debugging
        return res.status(500).json({ success: false, message: "An error occurred!" }); // Internal server error
    }
});

router.delete('/delete/:id', verifyUser, async (req, res, next) => {
    try {
        if ((req.user.id || req.user._id) !== req.params.id) {
            console.log('deleted')
            return res.status(404).json({ success: false, message: "unauthorised" });
        }
        await userSchema.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true, message: "User logged out!" });
    } catch (error) {
        next(errorHandler());
    }
});

module.exports = router;