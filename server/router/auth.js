import { Router } from "express";
import AuthController, { verifyUser } from "../controllers/auth.js";
import { localVariables } from "../middleware/auth.js";

const router = Router();
const authController = new AuthController();

// POST METHODS

router.route('/').post(verifyUser,(req,res)=> res.end());
router.route('/login').post(verifyUser,authController.login);

// GET METHODS
router.post('/generateOTP',verifyUser,localVariables,authController.generateOTP);

router.post('/verifyOTP',verifyUser,authController.verifyOTP);

router.get('/createResetSession',authController.createResetSession);

// PUT METHODS
router.put('/resetPassword',verifyUser,authController.resetPassword);


export default router;