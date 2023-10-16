import React, { useContext, useState } from 'react'
import '../../../Assets/Style/style.css';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import style from '../Login/Login.module.css';
import { userContext } from '../Context/userContext';
export default function Login() {
    let {setUserToken,setUserData}= useContext(userContext);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    async function LoginSubmit(values) {
        setIsLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values).catch((err) => { setError(err.response.data.message); setIsLoading(false); });
        if (data.message === 'success') {
            localStorage.setItem('userToken',data.token);
            setUserToken(data.token);
            setUserData(data.user);
            navigate('/');
            setIsLoading(false);
        }
    }


    const validationSchema = Yup.object({
        email: Yup.string().email('email is invalid').required('email is required'),
        password: Yup.string().min(6, 'password minimum length is 6').matches(/^[A-Z][a-z0-9]{5,10}$/, 'password should start with uppercase letter').required('password is required')
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        }, validationSchema,
        onSubmit: LoginSubmit
    });
    return (
        <>
            <section className={`mx-auto w-75 py-5 ${style.marginTop}`}>
                <div className="container">
                    {error ? <div className='alert alert-danger w-50 mx-auto'>{error}</div> : ''}
                    <h3>Login</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="email">Email :</label>
                        <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id='email' name='email' />
                        {formik.errors.email && formik.touched.email ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.email}</div> : ''}
                        <label htmlFor="password">Password :</label>
                        <input className='form-control' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" id='password' name='password' />
                        {formik.errors.password && formik.touched.password ? <div className='alert mt-2 p-2 alert-danger'>{formik.errors.password}</div> : ''}
                        {isLoading ? <button type='button' className='btn mt-3 bg-Main text-white'><Audio
                            height="20"
                            width="80"
                            color="white"
                            ariaLabel="audio-loading"
                            wrapperStyle={{}}
                            wrapperClassName="wrapper-class"
                            visible={true}
                        /></button> : <>
                            <div className='d-flex align-items-center justify-content-between'>
                                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className={`${style.btnWidth} btn mt-3 bg-Main text-white`}>Login</button>
                                
                            </div>
                            <Link className={`mt-2 ${style.a}`} to={'/forgetPassword'}>forget your password ?</Link>
                        </>
                        }
                    </form>

                </div>
                
            </section>
        </>
    )
}
