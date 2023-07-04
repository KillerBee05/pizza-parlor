import React from "react";
import Button from '../../button';
import {Topping} from '../../../types';

export interface PropTypes {
    allToppings: Topping[];
    createPizza: () => void;
    onChange: (pizza: string) => void;
    addTopping: (topping: string) => void;
    pizza: string;
    selectedToppings: string[];
}

function AddPizza({ 
    addTopping, 
    allToppings, 
    createPizza, 
    onChange, 
    pizza, 
    selectedToppings
}: PropTypes){
    let availableToppings = [];
    for(const value of allToppings){
        availableToppings.push(value.name)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        createPizza()
    }
    return(
        <div data-testid='pizza-list'> 
            <form onSubmit={handleSubmit}>
            <div className='inline'> {selectedToppings && `Toppings selected: ${selectedToppings.join(", ")} `} </div>
                <span className='inline'>
                    <input 
                        aria-label="add pizza"
                        data-testid="pizza-input"
                        placeholder="Pizza name" 
                        type="text" 
                        value={pizza ? pizza : ''} 
                        onChange={(e) => onChange(e.target.value.charAt(0).toUpperCase().trim() + e.target.value.slice(1))} 
                    />
                    <select 
                        aria-label="select topping" 
                        value={selectedToppings ? selectedToppings : ''}  
                        onChange={(e) => addTopping(e.target.value)} 
                        multiple
                    >
                        <option disabled>Add toppings</option>
                        {availableToppings.map((topping, i) => {
                            return <option key={i} >
                                {topping}
                            </option>
                        })}
                     </select>
                    <Button style={{color: 'blue', marginLeft: '2rem'}} label={'Add'} />
                </span>
            </form> 
        </div>
    )
}

export default AddPizza;