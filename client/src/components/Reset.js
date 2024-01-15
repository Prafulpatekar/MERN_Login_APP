import React from 'react';
import { useFormik } from 'formik';
import {resetPasswordValidate} from '../helper/validate';

import styles from '../styles/Login.module.css';
import CustomToast from './CustomToast';

export default function Reset() {

  const formik = useFormik({
    initialValues: {
        password: '',
        confirmPassword: ''
    },
    validate: resetPasswordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
        console.log(values)
    }
  })

  return (
    <div className="container mx-auto">
        <CustomToast></CustomToast>
        <div className="flex justify-center items-center h-screen">
            <div className={styles.glass} style={{width:"30%"}}>

                <div className="title text-center">
                    <h4 className="text-5xl font-bold">Final step</h4>
                    <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                        To Reset password.
                    </span>
                </div>

                <form className="pt-20" onSubmit={formik.handleSubmit}>

                    <div className="textbox flex flex-col items-center gap-6">
                        <input {...formik.getFieldProps('password')} type="text" placeholder="New Password" className={styles.textbox}/>
                        <input {...formik.getFieldProps('confirmPassword')} type="text" placeholder="Repeat Password" className={styles.textbox}/>
                        <button type="submit" className={styles.btn}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
