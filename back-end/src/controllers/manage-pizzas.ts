import { Request, Response} from 'express';

const {Pizza} = require('../models/schema')

module.exports.getPizza = async (req: Request, res: Response) => {
    const pizzas = await Pizza.find();
    res.json(pizzas);
}

module.exports.savePizza = async (req: Request, res: Response) => {
    const {name, toppings} = req.body;
    if(name && toppings){
        Pizza
        .create({name, toppings})
        .then( (data: any) =>  res.json(data));
    } else {
        res.status(400).json("All fields are required");
    }
    
}

module.exports.updatePizza = async (req: Request, res: Response) => {
    const { _id, name, toppings } = req.body;
    if(_id && name && toppings){
        Pizza
        .findByIdAndUpdate(_id, {name, toppings})
        .then(() => res.json("Updated Successfully!"))
        .catch((err: string) => console.log(err))
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
