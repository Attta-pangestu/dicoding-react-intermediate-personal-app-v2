function Input({type, id, label, value, changeHandler}) {
    return(
        <>
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} value={value} onChange={changeHandler} />
        </>
    );
}

export default Input;