import toast from "react-hot-toast";
import { authenticate, verifyPassword } from "./apiRequest";

/** Validate login page usernmae**/
export const usernameValidate = async (values)=>{
    const errors = usernameVerify({},values);
    if(values.username){
        // check user exist or not
        const {status } = await authenticate(values.username);
        if(status !== 200){
            errors.exist = toast.error("User does not exist...!")
        }
    }

    return errors;
}
/** Validate password**/
export const passwordValidate = async (values)=>{
    const errors = passwordVerify({},values);
    if(values.password){
        // check password
        const response = await verifyPassword({username:values.username,password:values.password});
        if(response.status !== 200){
            errors.exist = toast.error(response.error)
        }
    }

    return errors;
}

/** Validate reset password**/
export const resetPasswordValidate =(values)=>{
    const errors = passwordVerify({},values);
    if(values.password !== values.confirmPassword){
        errors.exist = toast.error("Password doest not match...!")
    }

    return errors;
}

/*Validate Register Page*/
export const registerValidation = (values) =>{
    const errors = usernameVerify({},values);
    passwordVerify(errors,values);
    emailVerify(errors,values);

}

/*Validate Profile Page*/
export const profileValidation = (values) =>{
    const errors = emailVerify({},values);

    return errors;
}


/** Validate username **/
const usernameVerify = (error={},values)=>{
    if(!values.username){
        error.username = toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!');
    }else if(values.username.length <= 5){
        error.username = toast.error('Username must have minimum 6 characters');
    }

    return error;
}

/** Validate password **/
const passwordVerify = (error={},values)=>{
    const passwordRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(!values.password){
        error.password = toast.error('Password Required...!');
    }else if(values.password.includes(" ")){
        error.password = toast.error('Invalid Password...!');
    }else if(values.password.length <= 5){
        error.password = toast.error('Password must have minimum 6 characters');
    }else if(!passwordRegex.test(values.password)){
        error.password = toast.error('Password must have special characters');
    }

    return error;
}

/* verify Email */
const emailVerify = (error={},values) =>{
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(!values.email){
        error.email = toast.error('Email Required...!');
    }else if(values.email.includes(" ")){
        error.email = toast.error('Wrong Email...!');
    }else if(!emailRegex.test(values.email)){
        error.email = toast.error('Please enter valid email!');
    }

    return error;
}