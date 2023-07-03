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
const { Topping } = require('../models/schema');
module.exports.getToppings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const toppings = yield Topping.find();
    res.json(toppings);
});
module.exports.saveTopping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.topping;
    if (name) {
        try {
            // Looking for dupes
            const toppings = yield Topping.find();
            const foundToppings = toppings.find((topping) => topping.name === name);
            if (foundToppings)
                return res.status(400).json('Duplicate topping!');
            Topping
                .create({ name })
                .then((data) => res.json(data));
        }
        catch (error) {
            console.error(error);
            res.status(500).json('Internal Server Error');
        }
    }
    else {
        res.status(400).json("All fields are required");
    }
});
module.exports.updateTopping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, name } = req.body;
    if (_id && name) {
        try {
            // Looking for dupes
            const duplicateTopping = yield Topping.findOne({ _id: { $ne: _id }, name: name });
            if (duplicateTopping)
                return res.status(400).json('Duplicate topping!');
            Topping
                .findByIdAndUpdate(_id, { name })
                .then(() => res.json("Updated Successfully!"))
                .catch((err) => console.log(err));
        }
        catch (error) {
            console.error(error);
            res.status(500).json('Internal Server Error');
        }
    }
    else {
        res.status(400).json("All fields are required");
    }
});
module.exports.deleteTopping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body;
    if (id) {
        Topping
            .findByIdAndDelete(id)
            .then(() => res.json("Deleted Successfully!"))
            .catch((err) => console.log(err));
    }
    else {
        res.status(500).json("Something went wrong");
    }
});
