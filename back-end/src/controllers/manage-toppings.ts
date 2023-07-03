import { Request, Response} from 'express';
import {ToppingType} from './types'
const {Topping} = require('../models/schema')

module.exports.getToppings = async (req: Request, res: Response) => {
    const toppings = await Topping.find();
    res.json(toppings);
}

module.exports.saveTopping = async (req: Request, res: Response) => {
    const name = req.body.topping;
    if(name){
        try {
            // Looking for dupes
            const toppings = await Topping.find();
            const foundToppings = toppings.find((topping: ToppingType) => topping.name === name);
            if (foundToppings) return res.status(400).json('Duplicate topping!');

            Topping
            .create({name})
            .then( (data: any) => res.json(data));

        } catch (error) {
            console.error(error);
            res.status(500).json('Internal Server Error');
        }
    } else {
        res.status(400).json("All fields are required");
    }
}

module.exports.updateTopping = async (req: Request, res: Response) => {
    const { _id, name } = req.body;
    if(_id && name){
        try {
            // Looking for dupes
            const duplicateTopping = await Topping.findOne({ _id: { $ne: _id }, name: name });
            if (duplicateTopping) return res.status(400).json('Duplicate topping!');

            Topping
            .findByIdAndUpdate(_id, {name})
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

module.exports.deleteTopping = async (req: Request, res: Response) => {
    const id = req.body;
    if(id){
        Topping
        .findByIdAndDelete(id)
        .then(() => res.json("Deleted Successfully!"))
        .catch((err: string) => console.log(err));
    } else {
        res.status(500).json("Something went wrong");
    }
    
}
