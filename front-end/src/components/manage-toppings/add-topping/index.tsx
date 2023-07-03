import React from "react";
import Button from '../../button';

export interface PropTypes {
    createTopping: () => void;
    onChange: (topping: string) => void;
    topping: string;
}

function AddTopping( { createTopping, onChange, topping }: PropTypes ){
    const handleSubmit = (e: any) => {
        e.preventDefault();
        createTopping()
    }
    return(
        <div data-testid='topping-list'> 
            <form onSubmit={handleSubmit}>
                <span className='inline'>
                    <input 
                        aria-label="add topping" 
                        placeholder="Topping name"  
                        type="text" value={topping ? topping : ''} 
                        onChange={(e) => onChange(e.target.value)} 
                    />
                    <Button style={{color: 'red', marginLeft: '2rem'}} label={'Add'}/>
                </span>
            </form> 
        </div>
    )
}

export default AddTopping;