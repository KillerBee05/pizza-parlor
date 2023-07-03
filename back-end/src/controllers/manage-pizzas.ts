import { Request, Response} from 'express';
import {PizzaType} from './types'

const {Pizza} = require('../models/schema')

module.exports.getPizza = async (req: Request, res: Response) => {
    const pizzas = await Pizza.find();
    res.json(pizzas);
}

module.exports.savePizza = async (req: Request, res: Response) => {
    const {name, toppings} = req.body;
    if(name && toppings){
        try {
            // Looking for dupes
            const pizzas = await Pizza.find();
            const foundPizza = pizzas.find((pizza: PizzaType) => pizza.name === name);
            if (foundPizza) return res.status(400).json('Duplicate pizza!');

            Pizza
            .create({name, toppings})
            .then( (data: any) =>  res.json(data));

        } catch (error) {
            console.error(error);
            res.status(500).json('Internal Server Error');
        }
    } else {
        res.status(400).json("All fields are required");
    }
    
}

module.exports.updatePizza = async (req: Request, res: Response) => {
    const { _id, name, toppings } = req.body;
    if(_id && name && toppings){
        try {
             // Looking for dupes
            const duplicatePizza = await Pizza.findOne({ _id: { $ne: _id }, name: name });
            if (duplicatePizza) return res.status(400).json('Duplicate pizza name found!');

            Pizza
            .findByIdAndUpdate(_id, {name, toppings})
            .then(() => res.json("Updated Successfully!"))
            .catch((err: string) => console.log(err))

            } catch (error) {
            console.error(error);
            res.status(500).json('Internal Server Error');
            }
    } else {
        res.status(400).json("All fields are required");
    }
    
}

module.exports.deletePizza = async (req: Request, res: Response) => {
    const id = req.body;
    if(id){
        Pizza
        .findByIdAndDelete(id)
        .then(() => res.json("Deleted Successfully!"))
        .catch((err: string) => console.log(err))
    } else {
        res.status(500).json("Something went wrong");
    }
    
}
