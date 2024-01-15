import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { useFormik } from 'formik';
import {passwordValidate} from '../helper/validate';

import styles from '../styles/Login.module.css';
import CustomToast from './CustomToast';
import useFetch from '../hooks/fetch.hook';
import {useAuthStore} from '../store/store';
import { verifyPassword } from '../helper/apiRequest';
import toast from 'react-hot-toast';

export default function Password() {
  const navigate = useNavigate();
  const { username } = useAuthStore(state => state.auth);
  const [{ isLoading,apiData,serverError }] = useFetch(`user/${username}`)


  const formik = useFormik({
    initialValues: {
        username: username,
        password: ''
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) =>{
        let loginPromise = verifyPassword(values);
      toast.promise(loginPromise,{
        loading: "Creating...!",
        success: <b>Login successfully...!</b>,
        error: <b>Password not match...!</b>
      })
      loginPromise.then((res)=>{
        let { accessToken } = res?.data;
        localStorage.setItem("token",accessToken);
        navigate("/profile")
        })
    }
  })

  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">
        <CustomToast></CustomToast>
        <div className="flex justify-center items-center h-screen">
            <div className={styles.glass}>

                <div className="title text-left">
                    <h4 className="text-5xl font-bold">Hello {apiData?.data?.firstName || apiData?.data?.username}!</h4>
                    <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                        Explore More by connecting with us.
                    </span>
                </div>

                <form className="py-1" onSubmit={formik.handleSubmit}>
                    <div className="profile flex justify-center py-4">
                        <img src={apiData?.data?.profile || avatar} alt="avatar" className={styles.profile_img}/>
                    </div>

                    <div className="textbox flex flex-col items-center gap-6">
                        <input {...formik.getFieldProps('password')} type="text" placeholder="Password" className={styles.textbox}/>
                        <button type="submit" className={styles.btn}>Sign In</button>
                    </div>
                    <div className="text-center py-4">
                        <span className="text-gray-500">Forgot Password? <Link className="text-red-500" to='/recovery'>Recover</Link> Now</span>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
