import { Router } from 'express';
const {getPizza, savePizza, updatePizza, deletePizza} = require("../controllers/manage-pizzas")

const router = Router();

router.get('/pizza',getPizza);
router.post('/pizza',savePizza)
router.put('/pizza',updatePizza)
router.delete('/pizza',deletePizza)

module.exports = router;