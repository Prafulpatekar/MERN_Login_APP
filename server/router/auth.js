import { Router } from "express";

const router = Router();

// POST METHODS

// Use to authenticate user
router.route('/').post((req,res)=>{
    res.json('Auth Route');
});

router.route('/login').post((req,res)=>{
    res.json('Login Route')
});

// GET METHODS
router.route('/generateOTP').get((req,res)=>{
    res.json('Get OTP Route')
});

router.route('/verifyOTP').get((req,res)=>{
    res.json('Get verify OTP')
});

router.route('/createResetSession').get((req,res)=>{
    res.json('Get Reset Session')
});

// PUT METHODS
router.route('/resetPassword').put((req,res)=>{
    res.json('Reset Password Route');
});


export default router;