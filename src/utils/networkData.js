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
    const response = await axios.post(`${BASE_URL}/register`, { 
        name, 
        email,
        password
    }); 
    const responseData = response.data ; 
    if(responseData.status === 'success') {
        putAccessToken(responseData.data.hashedPassword); 
        alert("Berhasil Mendaftarkan Akun, Hai ",  responseData.data.name);
        console.log("Berhasil Mendaftarkan Akun, Hai ",  responseData.data.name);
        return ;
    }
    alert("Terjadi error saat mendaftarkan error : ", responseData.message);
    console.log("Terjadi error saat mendaftarkan error : ", responseData.message);
    
}

async function login({email, password}) {
    const response = await axios(`${BASE_URL}/login`, {
        email, 
        password, 
    });
    const responseData = response.data; 

    if(responseData.status === 'success') {
        putAccessToken(responseData.data.hashedPassword); 
        alert("Berhasil Masuk , Selamat Datang")
        console.log("Berhasil Masuk, accesToken",  responseData.data.accessToken);
        return ;
    }
    alert("Terjadi error saat mendaftarkan error : ", responseData.message);
    
}


async function getUserLoggedIn() {
    if(getAccessToken()) {
        const response = await axios(`${BASE_URL}/users/me`, {
            headers: {
                Authorization : `Bearer ${getAccessToken}`
            }
        });
    
        const responseData = response.data; 
    
        if(responseData.status === 'success') {
            alert("Berhasil Mendaftarkan Akun, Hai ",  responseData.data.name);
            const {id, name, email} = responseData.data;
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
}