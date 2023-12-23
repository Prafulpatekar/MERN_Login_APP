import { Router } from "express";
import UserController from "../controllers/users.js";

const router = Router();

const userController = new UserController();

// POST METHODS

// Use to register users
router.route('/register').post(userController.register);

// use to send email to users
router.route('/registerMail').post((req,res)=>{
    res.json('Register Mail Route')
});

// GET METHODS

// use to get user details
router.route('/:username').get((req,res)=>{
    res.json('get User Route');
});

// PUT METHODS

// use to update user details
router.route('/:id').put((req,res)=>{
    res.json('Update User Route');
});




export default router;