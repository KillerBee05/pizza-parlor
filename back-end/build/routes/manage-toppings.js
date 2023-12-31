"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { getToppings, saveTopping, updateTopping, deleteTopping } = require("../controllers/manage-toppings");
const router = (0, express_1.Router)();
router.get('/topping', getToppings);
router.post('/topping', saveTopping);
router.put('/topping', updateTopping);
router.delete('/topping', deleteTopping);
module.exports = router;
