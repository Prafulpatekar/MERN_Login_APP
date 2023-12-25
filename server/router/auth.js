import { Router } from "express";
import AuthController from "../controllers/auth.js";
import { localVariables, validateUser } from "../middleware/auth.js";

const router = Router();
const authController = new AuthController();

// POST METHODS

router.route('/login').post(authController.login);

// GET METHODS
router.get('/generateOTP',validateUser,localVariables,authController.generateOTP);

router.get('/verifyOTP',validateUser,authController.verifyOTP);

router.get('/createResetSession',authController.createResetSession);

// PUT METHODS
router.put('/resetPassword',authController.resetPassword);


export default router;