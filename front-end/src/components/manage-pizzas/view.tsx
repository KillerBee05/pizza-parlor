import React from "react";
import Button from '../button'
import AddPizza from './add-pizza'
import EditPizza from './edit-pizza'
import PizzaList from './pizza-list'
import {Topping, Pizza} from '../../types';


export interface PropTypes {
    allPizzas: Pizza[];
    addTopping: (topping: string) => void
    allToppings: Topping[];
    cancel: () => void;
    createPizza: () => void;
    deletePizza: (id: string) => void;
    editPizza: () => void;
    getSelectedPizza: (selectedPizza: Pizza) => void;
    isUpdating: boolean;
    loading: boolean;
    onChange: (topping: string) => void;
    pizza: string;
    selectedToppings: string[];
}

function View({ 
    addTopping, 
    allPizzas, 
    allToppings, 
    cancel, 
    createPizza, 
    editPizza, 
    deletePizza, 
    getSelectedPizza, 
    isUpdating,
    loading,
    onChange,
    pizza, 
    selectedToppings
}: PropTypes){
    return(
        <div data-testid='topping-list'>
            {!isUpdating ? ( 
                <AddPizza 
                    addTopping={addTopping} 
                    allToppings={allToppings} 
                    createPizza={createPizza} 
                    onChange={onChange}
                    pizza={pizza} 
                    selectedToppings={selectedToppings} 
                /> 
            ): (
                <EditPizza 
                    addTopping={addTopping} 
                    allToppings={allToppings} 
                    cancel={cancel} 
                    editPizza={editPizza} 
                    onChange={onChange} 
                    pizza={pizza} 
                    selectedToppings={selectedToppings} 
                /> 
            )}
            < PizzaList 
                allPizzas={allPizzas}
                loading={loading}
                deletePizza={deletePizza}
                getSelectedPizza={getSelectedPizza}
            />
        </div>
    )
}

export default View;