import React from "react";
import Button from '../../button'
import {Topping} from '../../../types';

export interface PropTypes {
    allToppings: Topping[];
    deleteTopping: (id: string) => void;
    getSelectedTopping: (selectedTopping: Topping) => void;
    loading: boolean;
}

function ToppingList({ 
    allToppings, 
    deleteTopping, 
    getSelectedTopping, 
    loading,
}: PropTypes){
    return(
        <div data-testid='pizza-list'>
            { loading ? (
                    <p className="inline"> Loading toppings... </p>
            ): allToppings.length === 0 ? (
                <p className="inline"> No Toppings right now. Lets start shopping! </p>
            ):(
                allToppings.map((topping, i) => (
                    <span className="toppings" data-testid={`topping-${i}`} key={i} > 
                        {topping.name} 
                        <Button 
                            aria-label='edit-topping'
                            data-testid={`edit-button-${i}`}
                            label={'Edit'} 
                            onClick={() => getSelectedTopping({_id: topping._id, name: topping.name})} 
                            style={{color: 'red', marginLeft: '1rem'}} 
                        />
                        <Button 
                            aria-label='delete-topping'
                            data-testid={`delete-button-${i}`}
                            label={'X'} 
                            onClick={() => deleteTopping(topping._id)} 
                            style={{color: 'red', marginLeft: '1rem'}} 
                    />
                    </span>
                ))
            )}
        </div>
    )
}

export default ToppingList;