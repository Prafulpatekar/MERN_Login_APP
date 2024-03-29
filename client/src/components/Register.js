import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import { convertBase64 } from '../helper/convert';

import styles from '../styles/Login.module.css';
import CustomToast from './CustomToast';
import { registerUser } from '../helper/apiRequest';
import toast from 'react-hot-toast';

export default function Register() {

  const navigate = useNavigate();
  const [file,setFile] = useState();

  const formik = useFormik({
    initialValues: {
        email: '',
        username: '',
        password: ''
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      values = await Object.assign(values, {profile : file || ''})
      let registerPromise = registerUser(values);
      toast.promise(registerPromise,{
        loading: "Creating...!",
        success: <b>Register successfully...!</b>,
        error: <b>Could not register...!</b>
      })
      registerPromise.then(()=>{navigate("/")})
    }
  })

  /* Formik doesn't support upload of file that's why we need to create this handler*/
  const onUpload = async e =>{
    const base64 = await convertBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className="container mx-auto">
        <CustomToast></CustomToast>
        <div className="flex justify-center items-center h-screen">
            <div className={styles.glass}>

                <div className="title text-left">
                    <h4 className="text-5xl font-bold">Register Now!</h4>
                    <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                        Happy to join you!
                    </span>
                </div>

                <form className="py-1" onSubmit={formik.handleSubmit}>
                    <div className="profile flex justify-center py-4">
                      <label htmlFor='profile'>
                        <img src={file || avatar} alt="avatar" className={styles.profile_img}/>
                      </label>
                      <input onChange={onUpload} type="file" id="profile" name="profile"/>
                    </div>

                    <div className="textbox flex flex-col items-center gap-6">
                        <input {...formik.getFieldProps('email')} type="text" placeholder="Enter Email" className={styles.textbox}/>
                        <input {...formik.getFieldProps('username')} type="text" placeholder="Enter Username" className={styles.textbox}/>
                        <input {...formik.getFieldProps('password')} type="text" placeholder="Create Password" className={styles.textbox}/>
                        <button type="submit" className={styles.btn}>Sign Up</button>
                    </div>
                    <div className="text-center py-4">
                        <span className="text-gray-500">Already have account? <Link className="text-red-500" to='/'>Login</Link> Now</span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
