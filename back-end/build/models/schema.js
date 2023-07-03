"use strict";
const mongoose = require('mongoose');
const topping = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
});
const pizza = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    toppings: [String]
});
const toppingSchema = mongoose.model('toppings', topping);
const pizzaSchema = mongoose.model('pizzas', pizza);
module.exports = { Topping: toppingSchema, Pizza: pizzaSchema };
