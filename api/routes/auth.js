const express = require('express');
const router = express.Router();
const app = express();
const userSchema = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/errorhandler');
const verifyUser = require('../utils/verifyUser');

router.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
        return next(errorHandler(404, "User already exists!"))
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = new userSchema({
        username: username,
        email: email,
        password: hash
    });

    try {
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        next(errorHandler(403, 'Forbidden'))
    }
});

router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const Valid = await userSchema.findOne({ email });
        if (!Valid) {
            return next(errorHandler(404, "User not found!"))
        }
        const validPassword = await bcrypt.compare(password, Valid.password);

        if (!validPassword) {
            return next(errorHandler(404, "Wrong Credentials"))
        }
        const token = jwt.sign({ id: Valid._id }, process.env.JWTSECRET)
        console.log(Valid)
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(Valid);

    } catch (error) {
        next(errorHandler());
    }
});

router.post('/google', async (req, res, next) => {
    try {
        const user = await userSchema.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWTSECRET)
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(user)
        }
        else {
            const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hash = await bcrypt.hash(password, 10);
            const googleUser = new userSchema({ username: req.body.name, email: req.body.email, password: hash, avatar: req.body.photo })
            await googleUser.save();
            const token = jwt.sign({ id: user._id }, process.env.JWTSECRET)
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(googleUser)
        }
    } catch (error) {
        next(errorHandler());
    }
});

router.post("/signout", (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('user has been logged out!')
    } catch (error) {
        next(errorHandler());
    }
});

router.delete('/delete/:id', verifyUser, async (req, res, next) => {
    try {
        if ((req.user.id || req.user._id) !== req.params.id) {
            return next(errorHandler(404, 'You can only delete your own account!'));
        }
        await userSchema.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted!')
    } catch (error) {
        next(errorHandler());
    }
});

module.exports = router;