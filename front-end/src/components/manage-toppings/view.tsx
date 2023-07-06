import React from "react";
import AddTopping from './add-topping'
import EditTopping from './edit-topping'
import ToppingList from './topping-list'
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
            <ToppingList 
                allToppings={allToppings} 
                deleteTopping={deleteTopping} 
                getSelectedTopping={getSelectedTopping}  
                loading={loading} 
            />
        </div>
    )
}

export default View;