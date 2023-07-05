import React from "react";
import Button from '../button'
import AddTopping from './add-topping'
import EditTopping from './edit-topping'
import {Topping} from '../../types';

export interface PropTypes {
    allToppings: Topping[]
    cancel: () => void;
    createTopping: () => void;
    deleteTopping: (id: string) => void;
    editTopping: () => void;
    getSelectedTopping: (selectedTopping: Topping) => void;
    isUpdating: boolean;
    loading: boolean;
    onChange: (topping: string) => void;
    topping: string;
}

function View({ 
    allToppings, 
    cancel, 
    createTopping,
    deleteTopping, 
    editTopping, 
    getSelectedTopping, 
    isUpdating, 
    loading,
    onChange, 
    topping
}: PropTypes ){
    return(
        <div>
            {!isUpdating ? ( 
                <AddTopping createTopping={createTopping} onChange={onChange} topping={topping} /> 
            ): (
                <EditTopping cancel={cancel} editTopping={editTopping} onChange={onChange} topping={topping} /> 
            )}
            
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

export default View;