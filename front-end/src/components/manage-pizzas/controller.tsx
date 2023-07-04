import React, {useState, useEffect} from "react";
import View from './view';
import {Topping, Pizza} from '../../types';

interface StateType {
    allPizzas: Pizza[];
    allToppings: Topping[];
    isUpdating: boolean;
    loading: boolean;
    selectedPizza?: Topping;
    selectedToppings: string[];
    pizza: string;
}

const INITIAL_STATE: StateType = {
    allPizzas: [],
    allToppings: [],
    isUpdating: false,
    loading: false,
    selectedPizza: undefined,
    selectedToppings: [],
    pizza: '',
};

function Controller(){
    const [state, setState] = useState<StateType>(INITIAL_STATE);

    const { 
        allPizzas, 
        allToppings, 
        isUpdating,
        loading,
        pizza, 
        selectedPizza, 
        selectedToppings 
    } = state;

    const fetchPizzas = async () => {
        setState({...state, loading: true})
        const pizzaData = await fetch('https://pizza-parlor.onrender.com/pizza')
        .then( response => response.json())
        .then( data => data)
        
        const toppingData = await fetch('https://pizza-parlor.onrender.com/topping')
        .then( response => response.json())
        .then( data => data)

        setState({
            ...state,  
            allPizzas: pizzaData, 
            allToppings: toppingData, 
            loading: false,
            pizza: '', 
            selectedToppings: []
        })
    }

    const createPizza = async () => {
        let isDupe;
        if(pizza !== '' && selectedToppings.length > 0){ 
            for(const value of allPizzas){
                if(value.name === pizza) isDupe = true
            }
            
            const newPizza = {
                name: pizza, 
                toppings: selectedToppings
            }

            if(isDupe) alert('This pizza already exists!') 
            else {
                await fetch('https://pizza-parlor.onrender.com/pizza', {
                    method:'POST',
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(newPizza)
                })
                .then((response) => response.json())
                .then(() => fetchPizzas())
                .catch((error) => console.error(error));
            }
        }
        else alert('Please enter pizza and toppings');
    }

    const editPizza = async () => {
        if(pizza !== '' && selectedToppings.length > 0 ){

            const updatedPizza = {
                ...selectedPizza, _id:`${selectedPizza?._id}`, 
                name: pizza, toppings: 
                selectedToppings
            }
        
            await fetch('https://pizza-parlor.onrender.com/pizza', {
            method:'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(updatedPizza)
            })
            .then((response) => response.json())
            .then(() => fetchPizzas())
            .catch((error) => console.error(error)); 
            
        } 
        else alert('Please enter pizza and toppings')
    }

    const deletePizza = async (_id: string) => {
        await fetch(`https://pizza-parlor.onrender.com/pizza`, {
            method:'DELETE',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({_id})
        })
        .then((response) => response.json())
        .then(() => fetchPizzas())
        .catch((error) => console.error(error)); 
    }

    useEffect(()=> {
        fetchPizzas();
        // eslint-disable-next-line 
    },[])

    
    const onChange = (pizza: string) => setState({...state, pizza });
    const addTopping = (topping: string) => {
        let toppings = selectedToppings;
        if(toppings.includes(topping)) alert("You've already added this topping");
        else {
            toppings.push(topping);
            setState({...state, selectedToppings: toppings })
        }
    }
    
    const getSelectedPizza = (selectedPizza: Topping) => {
        setState({
            ...state, 
            isUpdating: true, 
            selectedPizza, 
            pizza: selectedPizza.name,
            selectedToppings: []
        });
    }

    const onCancel = () => {
        setState({
            ...state, 
            isUpdating: false , 
            pizza:'', 
            selectedToppings: []
        });
    }

    return(
        <div> 
            <View 
                addTopping={addTopping} 
                allPizzas={allPizzas}
                allToppings={allToppings}
                cancel={onCancel}
                createPizza={createPizza} 
                deletePizza={deletePizza} 
                editPizza={editPizza}
                getSelectedPizza={getSelectedPizza}
                isUpdating={isUpdating} 
                loading={loading}
                onChange={onChange}
                pizza={pizza} 
                selectedToppings={selectedToppings}
            />
        </div>

    )
}

export default Controller;