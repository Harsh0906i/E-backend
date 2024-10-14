const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    discountedPrice: {
        type: Number,
    },
    regularPrice: {
        type: Number,
    },
    storage: {
        RAM:{
            type:Number
        },
        ROM:{
            type:Number
        }
    },
    image: {
        type: String,
    },
    category:{
        type:String
    }
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;