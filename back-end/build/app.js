"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors = require('cors');
const toppingRoutes = require('./routes/manage-toppings');
const pizzaRoutes = require('./routes/manage-pizzas');
const mongoose = require('mongoose');
require('dotenv').config();
exports.app.use(express_1.default.json());
exports.app.use(cors());
exports.app.use(toppingRoutes);
exports.app.use(pizzaRoutes);
const port = process.env.port || 5000;
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log(`Connected To MongoDB...`))
    .catch((error) => console.log(error));
exports.app.listen(port, () => {
    console.log(`Connect successfully on ${port}`);
});
