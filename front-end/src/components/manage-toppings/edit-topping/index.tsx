import React from "react";
import Button from '../../button'

export interface PropTypes {
    cancel: () => void;
    editTopping: () => void;
    onChange: (topping: string) => void;
    topping: string;
}


function EditTopping( { cancel, editTopping, onChange, topping }: PropTypes ){
    const handleSubmit = (e: any) => {
        e.preventDefault();
        editTopping()
    }
    
    return(
        <div data-testid='topping-list'> 
            <form onSubmit={handleSubmit}>
                <span  className='inline'>
                    <input 
                        aria-label="edit topping" 
                        placeholder="Topping name"  
                        type="text" value={topping ? topping : ''} 
                        onChange={(e) => onChange(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                    />
                    <Button label={'Save'}  style={{color: 'red', marginLeft: '1rem'}} />
                    <Button label={'Cancel'} onClick={cancel} style={{color: 'red', marginLeft: '1rem'}} />
                </span> 
            </form> 
        </div>
    )
}

export default EditTopping;