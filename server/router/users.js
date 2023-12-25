import { Router } from "express";
import UserController from "../controllers/users.js";
import { validateUser } from "../middleware/auth.js";

const router = Router();

const userController = new UserController();

// POST METHODS

// Use to register users
router.post('/register',userController.register);

// use to send email to users
router.post('/registerMail',userController.registerMail);

// GET METHODS

// use to get user details
router.get('/:username',validateUser,userController.getUser);

// PUT METHODS

// use to update user details
router.get('/:id',validateUser,userController.updateUser);




export default router;