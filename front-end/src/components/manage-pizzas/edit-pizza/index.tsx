import React from "react";
import Button from '../../button'
import {Topping} from '../../../types';

export interface PropTypes {
    addTopping: (topping: string) => void;
    allToppings: Topping[];
    cancel: () => void;
    editPizza: () => void;
    onChange: (pizza: string) => void;
    pizza: string;
    selectedToppings: string[];
}


function EditPizza({ 
    addTopping, 
    allToppings, 
    cancel, 
    editPizza, 
    onChange, 
    pizza, 
    selectedToppings
}: PropTypes ){
    let availableToppings = [];
    for(const value of allToppings){
        availableToppings.push(value.name)
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        editPizza()
    }
    
    return(
        <div data-testid='topping-list'> 
            <form onSubmit={handleSubmit}>
            <div className='inline'> {selectedToppings && `Toppings selected: ${selectedToppings.join(", ")} `} </div>
                <span className='inline'>
                    <input 
                        aria-label="edit pizza"
                        placeholder="Pizza name" 
                        type="text" value={pizza ? pizza : ''} 
                        onChange={(e) => onChange(e.target.value.charAt(0).toUpperCase().trim() + e.target.value.slice(1))}
                    />
                    <select 
                        aria-label="edit topping" 
                        value={selectedToppings ? selectedToppings : ''}  
                        onChange={(e) => addTopping(e.target.value)} 
                        multiple
                    >
                        <option>Add toppings</option>
                        {availableToppings.map((topping, i) => {
                            return <option key={i} >
                                {topping}
                            </option>
                        })}
                     </select>
                    <Button label={'Save'}  style={{color: 'blue', marginLeft: '1rem'}} />
                    <Button label={'Cancel'} onClick={cancel} style={{color: 'blue', marginLeft: '1rem'}} />
                </span> 
            </form> 
        </div>
    )
}

export default EditPizza;