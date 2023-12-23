import UserModel from '../models/User.model.js'
import bcrypt from 'bcrypt';

// user related logic
export default class UserController{
    /*
    POST http://localhost:8080/api/v1/user/register
    * @param :{
        "username": "",
        "password": "",
        "profile": "",
        "email":""
    }
    */
    async register(req,res){
        try {
            const { username, password, profile, email } = req.body;        
    
            // check the existing user
            const existUsername = await UserModel.findOne({ username },{_id:0,__v:0});
            if(existUsername){
                return res.status(400).send({
                    msg:"Username already taken"
                });
            }
    
            // check for existing email
            const existEmail = await UserModel.findOne({ email },{_id:0,__v:0});
            if(existEmail){
                return res.status(400).send({
                    msg:"Email already exists"
                });
            }
            
            if(password){
                bcrypt.hash(password, 10)
                    .then( hashedPassword => {
                        
                    const user = new UserModel({
                        username,
                        password: hashedPassword,
                        profile: profile || '',
                        email
                    });

                    // return save result as a response
                    user.save()
                        .then(result => res.status(201).send({ msg: "User Register Successfully"}))
                        .catch(error => res.status(500).send({error}));

                }).catch(error => {
                    return res.status(500).send({
                        error : "Enable to hashed password"
                    });
                });
            };
    
        } catch (error) {
            return res.status(500).send({error});
        }
    
        
    }

    /*
    POST http://localhost:8080/api/v1/user/register
    * @param :{
        "username": "",
        "password": ""
    }
    */
    async registerMail(data){
        return {
			status: true,
			message: '',
			data: {},
		};
    }

    async getUser(username){
        return {
			status: true,
			message: '',
			data: {},
		};
    }

    async updateUser(id){
        return {
			status: true,
			message: '',
			data: {},
		};
    }
}