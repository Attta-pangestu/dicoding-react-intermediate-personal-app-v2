import React from "react";
import PropTypes from  'prop-types';

function ButtonActions({tooltipe, onClick, icon}) {
    return (
        <button className="action" title={tooltipe} onClick={onClick} > {icon} </button> 
        );
}

ButtonActions.propTypes = {
    tooltipe : PropTypes.string.isRequired, 
    onClick : PropTypes.func.isRequired,
    icon : PropTypes.object.isRequired,
}

export default ButtonActions;