"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Pizza } = require('../models/schema');
module.exports.getPizza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pizzas = yield Pizza.find();
    res.json(pizzas);
});
module.exports.savePizza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, toppings } = req.body;
    if (name && toppings) {
        Pizza
            .create({ name, toppings })
            .then((data) => res.json(data));
    }
    else {
        res.status(400).json("All fields are required");
    }
});
module.exports.updatePizza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, name, toppings } = req.body;
    if (_id && name && toppings) {
        Pizza
            .findByIdAndUpdate(_id, { name, toppings })
            .then(() => res.json("Updated Successfully!"))
            .catch((err) => console.log(err));
    }
    else {
        res.status(400).json("All fields are required");
    }
});
module.exports.deletePizza = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body;
    if (id) {
        Pizza
            .findByIdAndDelete(id)
            .then(() => res.json("Deleted Successfully!"))
            .catch((err) => console.log(err));
    }
    else {
        res.status(500).json("Something went wrong");
    }
});
