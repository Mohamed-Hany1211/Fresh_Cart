import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import style from '../ForgetPassword/ForgetPassword.module.css';
export default function ForgetPassword() {
let navigate = useNavigate();
    async function sendMail(values){
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values);
        if(data.statusMsg==='success'){
            setMsg(data.message);
            setSuccess(true);
            navigate('/confirmationCode')
        }
        
    }


    

    const [msg, setMsg] = useState(null);
    const [success, setSuccess] = useState(false);




    let formik = useFormik({
        initialValues: {
            email:""
        },
        onSubmit: sendMail
    })


    return (
        <>
        <div className={`${style.margin} container`}>
            <form className='w-100' onSubmit={formik.handleSubmit}>

                <label className='mb-2' htmlFor="email">Enter Your Email :</label>
                <input className='form-control w-100' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id='email' name='email'/>
                {success ? <div className='alert mt-2 p-2 alert-success'>{msg}</div> : ''}

                <button className='btn bg-Main text-white mt-3' type='submit'>Send</button>

            </form>

            </div>

        </>
    )
}
