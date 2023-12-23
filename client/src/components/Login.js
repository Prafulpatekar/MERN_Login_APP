import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { useFormik } from 'formik';
import {usernameValidate} from '../helper/validate';

import styles from '../styles/Login.module.css';
import CustomToast from './CustomToast';

export default function Login() {

  const formik = useFormik({
    initialValues: {
        username: ''
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
        console.log(values)
    }
  })

  return (
    <div className="container mx-auto">
        <CustomToast ></CustomToast>
        <div className="flex justify-center items-center h-screen">
            <div className={styles.glass}>

                <div className="title text-left">
                    <h4 className="text-5xl font-bold">Hello World!</h4>
                    <spna className="py-4 text-xl w-2/3 text-center text-gray-500">
                        Explore More by connecting with us.
                    </spna>
                </div>

                <form className="py-1" onSubmit={formik.handleSubmit}>
                    <div className="profile flex justify-center py-4">
                        <img src={avatar} alt="avatar" className={styles.profile_img}/>
                    </div>

                    <div className="textbox flex flex-col items-center gap-6">
                        <input {...formik.getFieldProps('username')} type="text" placeholder="Username" className={styles.textbox}/>
                        <button type="submit" className={styles.btn}>Let's Go</button>
                    </div>
                    <div className="text-center py-4">
                        <span className="text-gray-500">Not a Member <Link className="text-red-500" to='/register'>Register</Link> Now</span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
