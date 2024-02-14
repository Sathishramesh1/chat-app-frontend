import axios from 'axios';


const BASE_URL = "https://chat-app-v1rl.onrender.com";


export const RegisterUser = async (payload) => {
    const response = await axios.post(`${BASE_URL}/api/register`, payload);
    return response;
};

export const LoginUser = async (payload) => {
    const response = await axios.post(`${BASE_URL}/api/login`, payload);
    return response;
};

export const ForgetPassword = async (payload) => {
    const response = await axios.post(`${BASE_URL}/user/forget`, payload);
    return response;
};

export const ResetPassword = async (payload,resetToken) => {
    const response = await axios.post(`${BASE_URL}/user/reset/${resetToken}`, payload);
    return response;
};
export const searchUserApi = async (payload,authToken) => {

    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.get(`${BASE_URL}/api/alluser?search=${payload}`,{headers});
    return response;
};
export const createChat = async (payload,authToken) => {

    const headers = {
        'x-auth-token':authToken,
        'Content-Type':'application/json', 
    };
    const response = await axios.post(`${BASE_URL}/chat/`,{userId:payload},{headers});
    return response;
};