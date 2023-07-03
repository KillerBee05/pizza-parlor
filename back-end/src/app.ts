import express, { Application, Request, Response} from 'express';

export const app: Application = express();
const cors = require('cors');
const toppingRoutes = require('./routes/manage-toppings')
const pizzaRoutes = require('./routes/manage-pizzas')
const mongoose = require('mongoose');

require('dotenv').config()
app.use(express.json());
app.use(cors());
app.use(toppingRoutes);
app.use(pizzaRoutes);

const port = process.env.port || 5000;
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log(`Connected To MongoDB...`))
.catch((error: string) => console.log(error))

app.listen(port, () => {
    console.log(`Connect successfully on ${port}`);
});