const mongoose = require('mongoose');
const tempitemSchema = new mongoose.Schema({
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
    },
    userRef:{
        type:String
    }
}, { timestamps: true });

const TempItem = mongoose.model('TempItems', tempitemSchema);

module.exports = TempItem;