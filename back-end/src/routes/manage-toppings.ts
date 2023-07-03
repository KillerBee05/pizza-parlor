import { Router } from 'express';
const {getToppings, saveTopping, updateTopping, deleteTopping} = require("../controllers/manage-toppings")

const router = Router();

router.get('/topping',getToppings);
router.post('/topping',saveTopping)
router.put('/topping',updateTopping)
router.delete('/topping',deleteTopping)

module.exports = router;