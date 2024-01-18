import { useState } from "react";

export function useEmailInput(){
    const [email, setEmail] = useState('') ; 
    const changeEmailHandler = (event) => {
        setEmail(event.target.value);
    };
    return [email, changeEmailHandler];
}

export function usePassInput(){
    const [pass, setPass] = useState('') ; 
    const changePassHandler = (event) => {
        setPass(event.target.value);
    };
    return [pass, changePassHandler];
}

export function useNameInput(){
    const [name, setName] = useState('') ; 
    const changeNameHandler = (event) => {
        setName(event.target.value);
    };
    return [name, changeNameHandler];
}