import React, { useState } from 'react'
import '../../../Assets/Style/style.css';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import style from '../Register/Register.module.css'
export default function Register() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    async function registerSubmit(values) {
        setIsLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values).catch((err) => { setError(err.response.data.message); setIsLoading(false) });
        if (data.message === 'success') {
            navigate('/login');
            setIsLoading(false);
        }
    }





    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = Yup.object({
        name: Yup.string().min(3, 'name minimum length is 3 letters').max(25, 'name maximum length is 25 letters').required('name is required'),
        email: Yup.string().email('email is invalid').required('email is required'),
        phone: Yup.string().matches(phoneRegExp, 'phone number is invalid').required('phone is required'),
        password: Yup.string().min(6, 'password minimum length is 6').matches(/^[A-Z][A-Za-z0-9]{5,10}$/, 'password should start with uppercase letter').required('password is required'),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'repassword dont match the password').required('rePassword is required')
    })

    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        }, validationSchema,
        onSubmit: registerSubmit
    });
    return (
        <>
            <section className={`mx-auto w-75 py-5 ${style.marginTop}`}>
                <div className="container">
                    {error ? <div className='alert alert-danger w-50 mx-auto'>{error}</div> : ''}
                    <h3>Register Now</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="name">Name :</label>
                        <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" id='name' name='name' />
                        {formik.errors.name && formik.touched.name ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.name}</div> : ''}
                        <label htmlFor="email">Email :</label>
                        <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id='email' name='email' />
                        {formik.errors.email && formik.touched.email ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.email}</div> : ''}
                        <label htmlFor="phone">Phone :</label>
                        <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" id='phone' name='phone' />
                        {formik.errors.phone && formik.touched.phone ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.phone}</div> : ''}
                        <label htmlFor="password">Password :</label>
                        <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" id='password' name='password' />
                        {formik.errors.password && formik.touched.password ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.password}</div> : ''}
                        <label htmlFor="repassword">RePassword :</label>
                        <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" id='repassword' name='rePassword' />
                        {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.rePassword}</div> : ''}
                        {isLoading ? <button type='button' className='btn mt-3 bg-Main text-white'><Audio
                            height="20"
                            width="80"
                            color="white"
                            ariaLabel="audio-loading"
                            wrapperStyle={{}}
                            wrapperClass="wrapper-class"
                            visible={true}
                        /></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn mt-3 bg-Main text-white'>Register</button>}
                    </form>
                </div>
            </section>
        </>
    )
}
