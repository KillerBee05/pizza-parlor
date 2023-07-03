export interface Topping {
    _id: string;
    name: string;
}

export interface Pizza {
    _id: string;
    name: string
    toppings: [];
}