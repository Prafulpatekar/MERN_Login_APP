import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { useFormik } from 'formik';
import { profileValidation } from '../helper/validate';
import { convertBase64 } from '../helper/convert';

import styles from '../styles/Login.module.css';
import extend from '../styles/Profile.module.css';
import CustomToast from './CustomToast';

export default function Profile() {

  const [file,setFile] = useState();

  const formik = useFormik({
    initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        address: ''
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values =>{
      values = await Object.assign(values, {profile : file || ''})
        console.log(values)
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
            <div className={`${styles.glass} ${extend.glass}`}>

                <div className="title text-left">
                    <h4 className="text-5xl font-bold">Your Profile!</h4>
                    <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                        You can update your details.
                    </span>
                </div>

                <form className="py-1" onSubmit={formik.handleSubmit}>
                    <div className="profile flex justify-center py-4">
                      <label htmlFor='profile'>
                        <img src={file || avatar} alt="avatar" className={`${styles.profile_img} ${extend.profile_img}`}/>
                      </label>
                      <input onChange={onUpload} type="file" id="profile" name="profile"/>
                    </div>

                    <div className="textbox flex flex-col items-center gap-6">
                      <div className='name flex w-3/4 gap-10'>
                        <input {...formik.getFieldProps('firstName')} type="text" placeholder="Enter first Name" className={`${styles.textbox} ${extend.textbox}`}/>
                        <input {...formik.getFieldProps('lastName')} type="text" placeholder="Enter last Name" className={`${styles.textbox} ${extend.textbox}`}/>
                      </div>
                      <div className='name flex w-3/4 gap-10'>
                        <input {...formik.getFieldProps('email')} type="text" placeholder="Enter Email" className={`${styles.textbox} ${extend.textbox}`}/>
                        <input {...formik.getFieldProps('mobile')} type="text" placeholder="Enter mobile number" className={`${styles.textbox} ${extend.textbox}`}/>
                      </div>
                        
                        <input {...formik.getFieldProps('address')} type="text" placeholder="Enter address" className={`${styles.textbox} ${extend.textbox}`}/>
                        <button type="submit" className={styles.btn}>Update</button>
                    </div>
                    <div className="text-center py-4">
                        <span className="text-gray-500">Come back later? <Link className="text-red-500" to='/'>Logout</Link> Now</span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
