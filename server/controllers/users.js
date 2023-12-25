import { passwordEncryption } from '../helper/common.js';
import UserModel from '../models/User.model.js'

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

            if(!username) return res.status(400).send({
                error: "Please provide valid username!"
            })
            if(!email) return res.status(400).send({
                error: "Please provide valid email!"
            })
            if(!password) return res.status(400).send({
                error: "Please provide valid password!"
            })
            if(!profile) return res.status(400).send({
                error: "Please provide profile!"
            })
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
            let hashedPassword;
            if(password){
                hashedPassword = await passwordEncryption(password);
            }else{
                return res.status(500).send({
                    error : "Enable to hashed password"
                });
            }
            const user = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || '',
                email
            });

            // return save result as a response
            user.save()
            .then(result =>{
                res.status(201).send({ msg: "User Register Successfully"})
            }).catch(error=>{
                res.status(500).send({ error })
            })
    
        } catch (error) {
            return res.status(500).send({error:error?.message});
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
			message: 'Need to be implemented',
			data: {},
		};
    }

    async getUser(req,res){
        try{
            const { username } = req.params;
            // check the existing user
            if(!username) return res.status(400).send({
                error: "Invalid username!"
            })
            const user = await UserModel.findOne({ username },{_id:0,__v:0,password:0});
            if(!user){
                return res.status(404).send({
                    msg:"User does not exists"
                });
            }
            return res.status(200).send({
                data:user,
                msg:"User details fetched successfully!"
            });
        }catch (error) {
            return res.status(500).send({error:error?.message});
        };
    };

    
    async updateUser(req,res){

        try{
            let msg;
            const { id } = req.params;
            const body = req.body;

            if(!id) return res.status(400).send({error:"Please provide valid user id!"});
            if(body?.password) return res.status(400).send({error:"Unexpected keyword password"})

            const user = await UserModel.findOne({id},{_id:0,__v:0,password:0});
            if(!user) return res.status(404).send({error:"User not found!"});

            const updateUser = await UserModel.updateOne({id},{$set:body});
            if(updateUser.modifiedCount > 0){
                msg = "User data updated successfully!"
                await UserModel.updateOne({id},{$set:{lastModifiedDate:Date.now()}});
            }else{
                msg = "User data already updated!"
            }
            return res.status(200).send({
                msg,
                data:body
            })
        }catch(error){
            return res.status(500).send({error:error?.message});
        }
        
    };


};