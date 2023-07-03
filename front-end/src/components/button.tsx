import React from "react";
import '../style.scss';

export interface PropTypes {
    label: string;
    onClick?: (e: any) => void;
    style?: {};
}
function Button( {label, onClick, style}: PropTypes ){
    return(
        <div> 
            <button style={style} onClick={onClick}> {label} </button>
        </div>
    )
}

export default Button;