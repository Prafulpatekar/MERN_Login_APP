import bcrypt from 'bcrypt';

export const passwordEncryption = async (password) =>{
    try{
        return await bcrypt.hash(password, 10)
    }catch(error){
        throw new Error(error);
    }
}

export const passwordValidation = async(password,user)=>{
    try{
        return await bcrypt.compare(password,user.password);
    }catch(error){
        throw new Error(error);
    };
};  

