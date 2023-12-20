import toast from "react-hot-toast";

/** Validate login page usernmae**/
export const usernameValidate =(values)=>{
    const errors = usernameVerify({},values);

    return errors;
}
/** Validate password**/
export const passwordValidate =(values)=>{
    const errors = passwordVerify({},values);

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



/** Validate username **/
const usernameVerify = (error={},values)=>{
    if(!values.username){
        error.username = toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!');
    }else if(values.username.length <= 5){
        error.username = toast.error('Username must have minimum 6 characters');
    }
    return error
}

/** Validate password **/
const passwordVerify = (error={},values)=>{
    const specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(!values.password){
        error.password = toast.error('Password Required...!');
    }else if(values.password.includes(" ")){
        error.password = toast.error('Invalid Password...!');
    }else if(values.password.length <= 5){
        error.password = toast.error('Password must have minimum 6 characters');
    }else if(!specialCharacters.test(values.password)){
        error.password = toast.error('Password must have special characters');
    }
    return error
}