"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors = require('cors');
const toppingRoutes = require('./routes/manage-toppings');
const pizzaRoutes = require('./routes/manage-pizzas');
const mongoose = require('mongoose');
require('dotenv').config();
app.use(express_1.default.json());
app.use(cors());
app.use(toppingRoutes);
app.use(pizzaRoutes);
const port = process.env.port || 5000;
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log(`Connected To MongoDB...`))
    .catch((error) => console.log(error));
// const pizza = [
//     {id: 1, type:'grilled', toppings: 'saucey'},
//     {id: 2, type:'seared', toppings: 'pineapple'}
// ]
// const toppings = [
//     {id: 1, name:'cheese'},
//     {id: 2, name:'pineapple'},
//     {id: 3, name:'pepperoni'},
// ]
// app.get('/pizza', (req: Request, res: Response) => {
//     res.json(pizza);
// });
// app.get('/toppings', (req: Request, res: Response) => {
//     res.json(toppings);
// });
// app.post('/toppings', (req: Request, res: Response) => {
//     const {topping} = req.body;
//     const newTopping = {
//         id: 4,
//         topping
//     }
//     let arr = [...toppings, newTopping];
//     res.json(arr)
// });
app.listen(port, () => {
    console.log(`Connect successfully on ${port}`);
});
