require('dotenv').config()
const express = require('express');
const errorHandler = require('../utils/errorhandler');
const Item = require('../models/Items');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const verifyUser = require('../utils/verifyUser');
const TempItem = require('../models/tempItem');
const User = require('../models/user');
const cloudinary = require('cloudinary').v2
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

cloudinary.config({
    cloud_name: "dt74clvcq",
    api_key: '161187387384253',
    api_secret: 'aZZ_WUhf9L_jNit_B1ZD8NfZ70g'
});

router.get('/get', async (req, res, next) => {
    const { mobile, computer, CPU, searchTerm, All } = req.query;
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    try {
        const query = {};

        const selectedCategories = [];
        if (computer === 'true') selectedCategories.push('Computer');
        if (CPU === 'true') selectedCategories.push('CPU');
        if (mobile === 'true') selectedCategories.push('mobile');
        if (All === 'true' && selectedCategories.length > 0) {
            query.category = { $in: selectedCategories };
        }
        if (searchTerm) {
            query.name = { $regex: searchTerm, $options: 'i' };
        }
        const items = await Item.find(query).limit(limit).skip(startIndex);
        return res.json(items);
    }
    catch (error) {
        next(errorHandler(error));
    }
});

router.get('/getItem/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            res.status(404).json({ message: 'An error occured while fetching the data' })
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'An error occured' })
    }
});

router.post('/sell/:userid', upload.single('image'), async (req, res) => {
    try {
        const { userid } = req.params;
        const name = req.body.name;
        const regularPrice = req.body.regularPrice;
        const RAM = req.body.RAM;
        const ROM = req.body.ROM;
        const productType = req.body.productType;

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const findUser = await User.findById(userid)

        if (findUser.isAdmin === 'false') {

            const stream = cloudinary.uploader.upload_stream(
                { folder: "E-com" },
                async (error, result) => {
                    if (error) {
                        return res.json({ message: 'Failed to upload product' });
                    }

                    const newProduct = new TempItem({
                        name,
                        regularPrice,
                        storage: {
                            RAM,
                            ROM,
                        },
                        image: result.secure_url,
                        category: productType,
                        userRef: userid,
                    });

                    if (req.body.discountedPrice) {
                        const discountedPrice = req.body.discountedPrice[0];
                        newProduct.discountedPrice = discountedPrice;
                    }

                    await newProduct.save();

                    const mailOptions = {
                        from: process.env.EMAIL,
                        to: process.env.EMAIL,
                        subject: 'Request for uploading product!',
                        html: `
                        <p>You received a product request on your website:</p>
                        <p>Requested by email: ${findUser.email}</p>
                        <p>Product: ${newProduct.name}</p>
                        <p><img src="${newProduct.image}" alt="Product Image" style="max-width: 100%; height: auto;" /></p>
                        <p>Price: ${newProduct.regularPrice}</p>
                        <p>Discounted price: ${newProduct.discountedPrice}</p>
                        <a href="https://e-com-frontend-omega.vercel.app" style="color: blue; text-decoration: none;">see</a>`
                    };

                    await transporter.sendMail(mailOptions);
                    res.status(201).json(newProduct);
                }
            );

            stream.end(req.file.buffer);

        } else {

            const stream = cloudinary.uploader.upload_stream(
                { folder: "E-com" },
                async (error, result) => {
                    if (error) {
                        return res.json({ message: 'Failed to upload product' });
                    }

                    const newProduct = new Item({
                        name,
                        regularPrice,
                        storage: {
                            RAM,
                            ROM,
                        },
                        image: result.secure_url,
                        category: productType,
                        userRef: userid,
                    });

                    if (req.body.discountedPrice) {
                        const discountedPrice = req.body.discountedPrice[0];
                        newProduct.discountedPrice = discountedPrice;
                    }

                    await newProduct.save();
                    res.status(201).json(newProduct);
                }
            );
            stream.end(req.file.buffer);
        }
    } catch (error) {

    }
});

router.get('/dashboard/:userid', verifyUser, async (req, res) => {
    try {
        const { userid } = req.params;
        const { id } = req.user;
        if (!(userid === id)) {
            res.status(404).json({ message: 'you are unauthorized' })
            return
        }
        const user = await Item.find({ userRef: userid })
        if (!user) {
            res.status(200).json({ message: 'Please upload at least one product!' })
            return
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: 'An error occured!' })
    }
});

router.post('/delete', verifyUser, async (req, res) => {
    const { id } = req.user; // ID of the currently authenticated user
    const { user, item } = req.body; // User ID and item ID from the request body

    try {
        if (user === id) {
            const findItem = await Item.find({ userRef: user })
            if (!findItem) {
                res.status(500).json('item not found')
            }
            const deletedItem = await Item.findByIdAndDelete(item); // Attempt to delete the item
            if (!deletedItem) {
                return res.status(404).json({ message: 'Item not found!' }); // Return if item is not found
            }
            return res.status(200).json({ message: 'Item deleted!' }); // Confirm successful deletion
        } else {
            return res.status(403).json({ message: 'You are not authorized!' }); // Unauthorized access
        }
    } catch (error) {
        console.error('Error deleting item:', error); // Log the error for debugging
        return res.status(500).json({ message: 'An error occurred while deleting the item.' }); // Return error response
    }
});

router.get('/admin/:userId', verifyUser, async (req, res) => {
    const { userId } = req.params;
    const { id } = req.user

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const tempProduct = await TempItem.find({});

        if (!tempProduct) {
            return res.status(404).json({ message: 'Product not found in TempItem collection' });
        }

        if (userId === id && user.isAdmin === 'true') {
            return res.status(200).json(tempProduct);
        }

    } catch (error) {
        return res.status(500).json({ message: 'Error handling product', error: error.message });
    }
});

router.post('/admin/delete', verifyUser, async (req, res) => {
    const { id } = req.user;
    const { productId, action } = req.body;
    const tempProduct = await TempItem.find({});
    const user = await User.findById(id)
    try {
        if (!id) {
            return res.status(404).json({ message: 'you are unauthorized!' });
        }
        if (user.isAdmin === 'true') {
            if (action === 'accept') {
                const newItem = new Item({
                    name: tempProduct.name,
                    regularPrice: tempProduct.regularPrice,
                    storage: {
                        RAM: tempProduct.storage.RAM,
                        ROM: tempProduct.storage.ROM
                    },
                    image: tempProduct.image,
                    category: tempProduct.category,
                    userRef: tempProduct.userRef
                });

                if (tempProduct.discountedPrice) {
                    newItem.discountedPrice = tempProduct.discountedPrice
                }

                await newItem.save();
                await TempItem.findByIdAndDelete(productId);
                return res.status(200).json({ message: 'Product accepted and moved to Item collection!' });
            }

            if (action === 'reject') {
                await TempItem.findByIdAndDelete(productId);
                return res.status(200).json({ message: 'Product rejected and deleted from TempItem collection!' });
            }
        }
        else {
            return res.status(404).json({ message: 'you are unauthorised to view!' });
        }
    } catch (error) {
        console.error('error', error)
    }
})

module.exports = router;