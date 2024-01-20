import axios from "axios";

const BASE_URL = 'https://notes-api.dicoding.dev/v1';
const LOCAL_ACCESS_KEY = 'dicoding-notes-app'; 

const bearerAuthentication = `Bearer ${getAccessToken()}` ; 


function getAccessToken() {
    return localStorage.getItem(LOCAL_ACCESS_KEY);
}

function putAccessToken(token) {
    localStorage.setItem(LOCAL_ACCESS_KEY, token);
}

function logout() {
    putAccessToken(''); 
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


async function fetchWithToken(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
}



async function getUserLoggedIn() {
    try{
        if(getAccessToken()) {
            const response = await axios(`${BASE_URL}/users/me`, {
                headers: {
                    Authorization : `Bearer ${getAccessToken()}`
                }
            });
        
            const responseData = response.data; 
        
            if(responseData.status === 'success') {
                const {id, name, email} = responseData.data;
                return {
                    error : false, 
                    id,
                    name,
                    email,
                };
            } 
        } else{
            throw new Error("Access Token tidak terdeteksi") ; 
        }
    }catch(err) {
        alert("Terjadi error saat mendaftarkan error : ", responseData.message);
            return {error: true}; 
    }
    

    return {error: true} ; 
}

async function addNoteAPI({ title, body }) {
        try{
            const response =  await axios.post(`${BASE_URL}/notes`, {title, body}, {
                headers: {
                    Authorization : `Bearer ${getAccessToken()}`
                }
            });
            const responseJson = await response.data;
            console.log(responseJson);
            if (responseJson.status !== 'success') {
                return { error: true, data: null, message : responseJson.message };
            }
            return {error: false, data : responseJson.data, message : responseJson.message}
            
        }catch(err) {
            console.error("Terjadi error saat login: ", err);
            return { error: true};
        }
}

async function getActiveNote() {
    try{
        const response =  await axios(`${BASE_URL}/notes`, {
            headers: {
                Authorization : `Bearer ${getAccessToken()}`
            }
        });
        const responseJson = await response.data;
        if (responseJson.status !== 'success') {
            return { error: true, data: null, message : responseJson.message };
        }
        return {error: false, data : responseJson.data, message : responseJson.message}
        
    }catch(err) {
        alert("Terjadi Kesalahan Saat Mengambil Data Note");
        console.error("Terjadi error Mengambil Data Note ", err);
        return { error: true};
    }
}

async function getArchiveNOte() {
    try{
        const response =  await axios(`${BASE_URL}/notes/archived`, {
            headers: {
                Authorization : bearerAuthentication,
            }
        });
        const responseJson = await response.data;
        if (responseJson.status !== 'success') {
            return { error: true, data: null, message : responseJson.message };
        }
        return {error: false, data : responseJson.data, message : responseJson.message}
        
    }catch(err) {
        alert("Terjadi Kesalahan Saat Mengambil Data Note");
        console.error("Terjadi error Mengambil Data Note ", err);
        return { error: true};
    }
}

async function  getDetailNote(id) {
    try{
        const response =  await axios(`${BASE_URL}/notes/${id}`, {
            headers: {
                Authorization : `Bearer ${getAccessToken()}`
            }
        });
        const responseJson = await response.data;
        if (responseJson.status !== 'success') {
            return { error: true, data: null, message : responseJson.message };
        }
        return {error: false, data : responseJson.data, message : responseJson.message}
        
    }catch(err) {
        alert("Terjadi Kesalahan Saat Mengambil Detail Note");
        console.error("Terjadi Kesalahan Saat Mengambil Detail Note: ", err);
        return { error: true};
        
    }
} 

async function deleteNote(id) {
    try{
        const response =  await axios.delete(`${BASE_URL}/notes/${id}`, {
            headers: {
                Authorization : bearerAuthentication, 
            }
        });
        const responseJson = await response.data;
        if (responseJson.status !== 'success') {
            return { error: true, message : responseJson.message };
        }
        return {error: false, message : responseJson.message} ; 
        
    }catch(err) {
        alert("Terjadi Kesalahan Saat Menghapus Note");
        console.error("Terjadi Kesalahan Saat Menghapus Note ", err);
        return { error: true};
        
    }
}

async function archiveNote(id) {
    console.log("Arsip ", id);
    try{
        const response =  await axios.post(`${BASE_URL}/notes/${id}/archive`, {}, {
            headers : {
                Authorization : bearerAuthentication, 
            }
        });
        const responseJson = await response.data;
        if (responseJson.status !== 'success') {
            return { error: true, message : responseJson.message };
        }
        return {error: false, message : responseJson.message} ; 
        
    }catch(err) {
        alert("Terjadi Kesalahan Saat Mengarsipkan Note");
        console.error("Terjadi Kesalahan Saat Mengarsipkan Note ", err);
        return { error: true};
        
    }
}



async function unArchiveNote(id) {
    try{
        const response =  await axios.post(`${BASE_URL}/notes/${id}/unarchive`, {},  {
            headers: {
                Authorization : `Bearer ${getAccessToken()}`
            }
        });
        const responseJson = await response.data;
        if (responseJson.status !== 'success') {
            return { error: true, message : responseJson.message };
        }
        return {error: false, message : responseJson.message} ; 
        
    }catch(err) {
        alert("Terjadi Kesalahan Saat Mengarsipkan Note");
        console.error("Terjadi Kesalahan Saat Mengarsipkan Note ", err);
        return { error: true};
        
    }
}


async function editNote(id) {
    try{
        const response =  await axios.post(`${BASE_URL}/notes/${id}/unarchive`, {
            headers: {
                Authorization : `Bearer ${getAccessToken()}`
            }
        });
        const responseJson = await response.data;
        if (responseJson.status !== 'success') {
            return { error: true, message : responseJson.message };
        }
        return {error: false, message : responseJson.message} ; 
        
    }catch(err) {
        alert("Terjadi Kesalahan Saat Mengarsipkan Note");
        console.error("Terjadi Kesalahan Saat Mengarsipkan Note ", err);
        return { error: true};
        
    }
}


export {
    register,
    login, 
    getUserLoggedIn,
    logout, 
    addNoteAPI, 
    getActiveNote, 
    getArchiveNOte, 
    getDetailNote, 
    deleteNote, 
    archiveNote, 
    unArchiveNote, 
};