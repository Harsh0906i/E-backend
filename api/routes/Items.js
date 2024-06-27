const express = require('express');
const errorHandler = require('../utils/errorhandler');
const Item = require('../models/Items');
const router = express.Router();

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
router.get('/getItem/:id', async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        console.log('1',req.params.id);
        console.log('2',item);
        if (!item) {
            return next(errorHandler(404, 'Listing not found'));
        }
        console.log('3',item);
        res.status(200).json(item);
    } catch (error) {
        next(errorHandler());
    }
})

module.exports = router;