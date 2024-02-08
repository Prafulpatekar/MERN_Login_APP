import { accessTokenGenrator } from "../helper/auth.js";
import {  passwordEncryption, passwordValidation } from "../helper/common.js";
import { sendEmail } from "../helper/email.js";
import UserModel from '../models/User.model.js'
import otpGenerator from 'otp-generator';

/** middleware for verify user */
export async function verifyUser(req, res, next){
  try {
      
      const { username } = req.method == "GET" ? req.query : req.body;

      // check the user existance
      let exist = await UserModel.findOne({ username });
      if(!exist) return res.status(404).send({ error : "Can't find User!"});
      req.user = {
        id: exist.id,
        username: exist.username,
        email: exist.email
      }
      next();

  } catch (error) {
      return res.status(404).send({ error: "Authentication Error"});
  }
}

// Authenticate related logic
export default class AuthController{

    /*
    POST http://localhost:8080/api/v1/user/register
    * @param :{
        "username": "",
        "password": ""
    }
    */
    async login(req,res){
      try{
        const { username, password } = req.body;
        // check the existing user
        const user = await UserModel.findOne({ username },{_id:0,__v:0});
        if(!user){
            return res.status(400).send({
                msg:"Username does not exists"
            });
        }
        if (user && (await passwordValidation(password,user))){
          const accessToken = await accessTokenGenrator(user);
          const data = {
            username:user.username,
          }
          return res.status(200).send({
            msg: "Login Successful...!",
            data: data,
            accessToken
        });
        }
        else{
          return res.status(401).send({
            error: "Username or password is invalid!"
          });
        };
      }catch(error){
        return res.status(500).send({
          error:error?.message
        });
      }

      
    };

    async generateOTP(req,res){
      try{

        const OTP = await otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false});
        req.app.locals.OTP = OTP;
        const sender = await sendEmail({
          to: req.user.email,
          subject: "Recovery password verfied from prafulpatekar.dev",
          message: `Hi ${req.user?.username}, \nThe OTP ${req.app.locals.OTP} for recovery email ${req.user.email} for your account.`
        })
        if(sender?.status){
          return res.status(200).send({msg:"OTP Generated successfully"});
        }else{
          return res.status(500).send({err:"Unable to send OTP"});

        }
      }catch(error){
        return res.status(500).send({error:error?.message});
      }

    }

    async verifyOTP(req,res){
      try{
        const { OTP } = req.body;
        if(Number(OTP) === Number(req.app.locals.OTP)){
          req.app.locals.OTP = null;
          req.app.locals.resetSession = true;
          return res.status(200).send({msg:"OTP verified successfully!"});
        }else{
          return res.status(401).send({msg:"Invalid OTP!"});
        };
      }catch(error){
        return res.status(500).send({error:error?.message});
      };
		};

    async createResetSession(req,res){
      if(req.app.locals.resetSession){
        return res.status(200).send({ flag : req.app.locals.resetSession})
      };
      return res.status(440).send({msg:"Session expired!"});
    }

    async resetPassword(req,res){
      try{
        let msg;
        if(!req.app.locals.resetSession){
          return res.status(440).send({error:"Session expired"});
        }
        const { username, password } = req.body;
        const user = await UserModel.findOne({username},{_id:0,__v:0,password:0});
        if(!user){
          return res.status(404).send({error:"User not found!"});
        }
        const hashedPassword = await passwordEncryption(password);
        
        const updatePassword = await UserModel.updateOne({username},{$set:{password:hashedPassword}});
        if(updatePassword?.modifiedCount){
          await UserModel.updateOne({username},{$set:{lastModifiedDate:Date.now()}});
          if(req.app.locals.resetSession){
            req.app.locals.resetSession = false; // allow access to this route only once
          }
          msg = "Password updated successfully";
          return res.status(200).send({msg})
        }
        msg = "Please provide a new password";
        return res.status(400).send({error:msg})
        

      }catch(error){
        return res.status(500).send({error:error?.message});
      }

    }
}