import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import style from '../Adress/Adress.module.css'
import { cartContext } from '../CartContext/CartContext';

export default function Adress() {


    let {onlinePayment,cartId} = useContext(cartContext);


    async function handleAdressSubmit(values){
        let resp = await onlinePayment(cartId,values,'https://localhost:3000');
        window.location.href = resp?.data.session.url;
    }

    let formik = useFormik({
        initialValues:{
            details:'',
            phone:'',
            city:''
        },
        onSubmit:handleAdressSubmit
    })



    return (
        <>
        <div className={`container ${style.margin}`}>
            <form onSubmit={formik.handleSubmit}>
                <label className='mb-2' htmlFor="details">Details :</label>
                <input className='w-100 form-control mb-2' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="details" id="details" />

                <label className='mb-2' htmlFor="phone">Phone :</label>
                <input className='w-100 form-control mb-2' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phone" />

                <label className='mb-2' htmlFor="city">City :</label>
                <input className='w-100 form-control mb-2' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="city" id="city" />
                <button disabled={!(formik.dirty&&formik.touched)} type='submit' className='btn bg-Main text-white'>Pay Now</button>
            </form>
        </div>
        
        </>
    )
}
