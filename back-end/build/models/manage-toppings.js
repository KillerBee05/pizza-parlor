"use strict";
const mongoose = require('mongoose');
const toppingSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
});
module.exports = mongoose.model('Topping', toppingSchema);
