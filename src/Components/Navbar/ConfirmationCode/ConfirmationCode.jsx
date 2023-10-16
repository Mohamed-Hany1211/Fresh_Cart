import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import style from '../ConfirmationCode/ConfirmationCode.module.css';
export default function ConfirmationCode() {
    let navigate = useNavigate();
    async function ConfirmCode(values){
        let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values);
        if(data.status==='Success'){
            navigate('/resetPass');
        }
    }


    

    // const [msg, setMsg] = useState(null);
    // const [success, setSuccess] = useState(false);




    let formik = useFormik({
        initialValues: {
            resetCode:''
        },
        onSubmit: ConfirmCode
    })


    return (
        <>
        <div className={`${style.margin} container`}>
            <form className='w-100' onSubmit={formik.handleSubmit}>
                <label className='mb-2' htmlFor="confirmationCode">Enter confirmation Code :</label>
                <input type="text" className='form-control w-100' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode}  id='confirmationCode' name='resetCode'/>
                

                <button className='btn bg-Main text-white mt-3' type='submit'>Confirm</button>

            </form>
            
            </div>

        </>
    )

}
