import React, {useState, useEffect} from "react";
import View from './view';
import {Topping} from './types';

interface StateType {
    allToppings: Topping[];
    isUpdating: boolean;
    selectedTopping?: Topping;
    topping: string;
}

const INITIAL_STATE: StateType = {
    allToppings: [],
    isUpdating: false,
    selectedTopping: undefined,
    topping: '',
};

function Controller(){
    const [state, setState] = useState<StateType>(INITIAL_STATE);

    const { allToppings, isUpdating, selectedTopping, topping } = state;


    const fetchToppings = async () => {
        await fetch('https://pizza-parlor.onrender.com/topping')
        .then( response => response.json())
        .then( data => setState({...state, allToppings: data, isUpdating: false, topping:''}))
    }

    const createTopping = async () => {
        let isDupe;
        if(topping !== ''){ 
            for(const value of allToppings){
                if(value.name === topping) isDupe = true
            }
            if(isDupe) alert('This topping already exists!') 
            else {
                await fetch('https://pizza-parlor.onrender.com/topping', {
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({topping})
                })
                .then((response) => response.json())
                .then(() => fetchToppings())
                .catch((error) => console.error(error));
            }
        }
        else alert('Please enter topping');
    }

    const editTopping = async () => {
        let isDupe;
        if(topping !== ''){
            for(const value of allToppings){
                if(value.name === topping) isDupe = true
            }
            const updatedTopping = {...selectedTopping, _id:`${selectedTopping?._id}`, name: topping}
            if(isDupe) alert('This topping already exists!') 
            else {
                await fetch('https://pizza-parlor.onrender.com/topping', {
                method:'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(updatedTopping)
                })
                .then((response) => response.json())
                .then(() => fetchToppings())
                .catch((error) => console.error(error)); 
            };
        } 
        else alert('Please enter topping')
    }

    const deleteTopping = async (_id: string) => {
        await fetch(`https://pizza-parlor.onrender.com/topping`, {
            method:'DELETE',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({_id})
        })
        .then((response) => response.json())
        .then(() => fetchToppings())
        .catch((error) => console.error(error)); 
    }

    useEffect(()=> {
        fetchToppings();
        // eslint-disable-next-line 
    },[])

    const onChange = (topping: string) => setState({...state, topping });
    const onCancel = () => setState({...state, isUpdating: false , topping:'' });
    const getSelectedTopping = (selectedTopping: Topping) => {
        setState({
            ...state, 
            isUpdating: true, 
            selectedTopping, 
            topping: selectedTopping.name
        });
    }

    return(
        <div> 
            <View  
                allToppings={allToppings}
                cancel={onCancel}
                createTopping={createTopping} 
                deleteTopping={deleteTopping} 
                editTopping={editTopping}
                getSelectedTopping={getSelectedTopping}
                isUpdating={isUpdating} 
                onChange={onChange}
                topping={topping} 
            />
        </div>

    )
}

export default Controller;