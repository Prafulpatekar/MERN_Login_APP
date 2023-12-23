import React from 'react';
import { Toaster } from 'react-hot-toast';


export default function CustomToast() {
  return (
    <Toaster position='top-right' reverseOrder={false}></Toaster>
  )
}
