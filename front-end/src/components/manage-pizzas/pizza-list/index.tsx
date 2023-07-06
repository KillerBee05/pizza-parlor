import React from "react";
import Button from '../../button'
import {Pizza} from '../../../types';

export interface PropTypes {
    allPizzas: Pizza[];
    deletePizza: (id: string) => void;
    getSelectedPizza: (selectedPizza: Pizza) => void;
    loading: boolean;
}

function PizzaList({ 
    allPizzas, 
    deletePizza, 
    getSelectedPizza, 
    loading,
}: PropTypes){
    return(
        <div data-testid='pizza-list'>
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

export default PizzaList;