import axios from 'axios';
import { jwtDecode} from 'jwt-decode';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN || "http://localhost:8090";


// Make API Requests

/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return {};
    let decode = jwtDecode(token)
    return decode;
}

// Authenticate Function

export const authenticate = async (username) => {
    try {
        return await axios.post('/api/v1/auth',{username});
    } catch (error) {
        return { error: "Username doesn't exist....!"};
    };
};

// Get user
export const getUser = async (username)=>{
    try {
        const { data } = await axios.get(`/api/v1/user/${username}`);
        return data;
    } catch (error) {
        console.log(error)
        return { error: "Password doesn't match....!"};
    };
};

// Register User
export const registerUser = async (credentials) => {
    try {
        const { data,msg ,statusCode } = await axios.post(`/api/v1/user/register`,credentials);
        // send emails
        const { email ,username } = credentials;
        const payload = {
            to:email,
            subject:`Welcome to Login APP.`,
            message:`Hi ${username}, Your new account comes with access to Login app and services.`
        }
        if(statusCode === 201){
            await axios.post(`/api/v1/user/registerMail`,payload);

            return data;
        }
        return {error: msg}
    } catch (error) {
        console.log(error)
        return { error: "Failed to register user....!"};
    }
}

// Logic User
export const verifyPassword = async ({ username, password }) => {
    try {
        if(username){
            const data = await axios.post(`/api/v1/auth/login`,{username,password});
            return data;
        }
    } catch (error) {
        return {status:500,error:"Password doesn't match...!"}
    }
}

// Update user profile 
export const updateUser = async (payload) => {
    try {
        const token = await localStorage.getItem('token');
        const data = await axios.put(`/api/v1/user`,payload,{headers: {"Authorization": `Bearer ${token}`}});
        return Promise.resolve({data})

    } catch (error) {
        Promise.reject({error:"Failed to update user profile...!"})
    }
}

// Generate OTP
export const generateOTP = async (username)=>{
    try {
        
<<<<<<< HEAD
        const {data:{code}} = await axios.get(`/api/v1/auth/generateOTP`,{username});
=======
        const {data:{code}} = await axios.post(`/api/v1/auth/generateOTP`,{username});
>>>>>>> 8a86a9b7a57e33e95e2e34e42e1cb6041b142db6
        return Promise.resolve({code})

    } catch (error) {
        return Promise.reject({error:"Failed to generate OTP...!"})
    }
}

/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
<<<<<<< HEAD
       const { data, status } = await axios.post('/api/v1/auth/verifyOTP', { username, OTP:code })
=======
       const { data, status } = await axios.post('/api/v1/auth/verifyOTP', { username, OTP:code });
>>>>>>> 8a86a9b7a57e33e95e2e34e42e1cb6041b142db6
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('/api/v1/auth/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}