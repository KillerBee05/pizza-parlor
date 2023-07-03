import { Request, Response} from 'express';

const {Topping} = require('../models/schema')

module.exports.getToppings = async (req: Request, res: Response) => {
    const toppings = await Topping.find();
    res.json(toppings);
}

module.exports.saveTopping = async (req: Request, res: Response) => {
    const name = req.body.topping;
    if(name){
        Topping
        .create({name})
        .then( (data: any) => res.json(data));
    } else {
        res.status(400).json("All fields are required");
    }
    
}

module.exports.updateTopping = async (req: Request, res: Response) => {
    const { _id, name } = req.body;
    if(_id && name){
        Topping
        .findByIdAndUpdate(_id, {name})
        .then(() => res.json("Updated Successfully!"))
        .catch((err: string) => console.log(err))
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
