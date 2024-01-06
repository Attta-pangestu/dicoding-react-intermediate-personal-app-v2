import React from "react";


function ButtonActions({tooltipe, onClick, icon}) {
    return (
        <button className="action" title={tooltipe} onClick={onClick} > {icon} </button> 
        );
}

export default ButtonActions;