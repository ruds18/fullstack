const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodName:{
        type: String,
        required : true
    },

    daysSinceIAte:{
        type: Number,
        required : true
    }
});

const food = mongoose.model( "food-data" , foodSchema)

module.exports = food;