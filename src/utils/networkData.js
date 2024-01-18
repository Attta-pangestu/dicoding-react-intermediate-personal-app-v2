import axios from "axios";

const BASE_URL = 'https://notes-api.dicoding.dev/v1';
const LOCAL_ACCESS_KEY = 'dicoding-notes-app'; 

function getAccessToken() {
    return localStorage.getItem(LOCAL_ACCESS_KEY);
}

function putAccessToken(token) {
    localStorage.setItem(LOCAL_ACCESS_KEY, token);
}

async function register({name, email, password}) {
    try{
        const response = await axios.post(`${BASE_URL}/register`, { 
            name, 
            email,
            password
        }); 
        const responseData = response.data ; 
        console.log(responseData);
        if(responseData.status === 'success') {
            return {error : false, message : responseData.message} ;
        }
    }
    catch(error) {
        return {error : true, message : error} ;
    }
    
}

async function login({ email, password }) {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method : 'POST', 
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body : JSON.stringify({email, password}),
        });
        const responseJSON = await response.json();
        const responseData = responseJSON;
        if (responseData.status === 'success') {
            putAccessToken(responseData.data.accessToken);
            return { error: false, message: responseData.message };
        }

    } catch (error) {
        alert("Terjadi Kesalahan Saat Login");
        console.error("Terjadi error saat login: ", error);
        return { error: true};
    }
}



async function getUserLoggedIn() {
    if(getAccessToken()) {
        const response = await axios(`${BASE_URL}/users/me`, {
            headers: {
                Authorization : `Bearer ${getAccessToken()}`
            }
        });
    
        const responseData = response.data; 
    
        if(responseData.status === 'success') {
            const {id, name, email} = responseData.data;
            alert("Berhasil Mendaftarkan Akun, Hai "  + name);
            return {
                error : false, 
                id,
                name,
                email,
            };
        } 
        alert("Terjadi error saat mendaftarkan error : ", responseData.message);
        return {error: true}; 
    }

    return {error: true} ; 
}

export {
    register,
    login, 
    getUserLoggedIn,
};