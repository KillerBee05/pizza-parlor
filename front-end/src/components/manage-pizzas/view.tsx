import React from "react";
import Button from '../button'
import AddPizza from './add-pizza'
import EditPizza from './edit-pizza'
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
            { loading ? (
                <p className="inline"> Loading pizza and toppings... </p>
            ) : allPizzas.length === 0 ? (
                <p className="inline"> No pizza right now. Lets start cookin'! </p>
            ):(
                allPizzas.map((pizza, i) => (
                    <span className="toppings" key={i} data-testid={`pizza-${i}`}> 
                        {pizza.name} ({pizza.toppings.join(", ")})
                        <Button 
                            aria-label={`edit-${pizza._id}`}
                            data-testid="edit-button"
                            label={'Edit'} 
                            onClick={() => getSelectedPizza({_id: pizza._id, name: pizza.name, toppings: pizza.toppings})} 
                            style={{color: 'blue', marginLeft: '1rem'}} 
                        />
                        <Button 
                            label={'X'} 
                            onClick={() => deletePizza(pizza._id)} 
                            style={{color: 'blue', marginLeft: '1rem'}} 
                        />
                    </span>
                ))
            )}
        </div>
    )
}

export default View;