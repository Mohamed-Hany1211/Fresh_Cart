import React from 'react';
import '../../../Assets/Style/style.css';
import AmazonPay from '../../../Assets/images/AmazonPay.png';
import MasterCard from '../../../Assets/images/MasterCard_Logo.svg.png';
import paypal from '../../../Assets/images/paypal-logo-11609371786gw3pnuakfe.png';
import style from '../Footer/Footer.module.css';
export default function Footer() {
    return (
        <>
            <section className='bg-main-light p-5'>
                <div className="container-fluid">
                    <div>
                        <div className="d-flex flex-column text-center">
                            <h3 className={`${style.h3Font}`}>Get the FreshCart app</h3>
                            <p>We will send you a link, open it on your phone to download the app</p>
                            <div className="search align-self-center w-100">
                                <input className={`p-1 w-50 ${style.InputmarginLeft} ${style.inputBorder}`} placeholder='Email ..' type="text" />
                                <button className={`${style.marginLeft} ${style.btnWidth} btn  bg-Main text-white`}>Share App Link</button>
                            </div>
                        </div>
                        <br />
                        <hr />
                        <div className="payment-methods d-flex align-items-center justify-content-center p-4 ">
                            <div className="left d-flex ">
                                <h4 className={`${style.h4Font}`}>Payment Partners</h4>
                                <img className={`${style.PaymentImg}`} src={AmazonPay} alt="AmazonPay" />
                                <img className={`${style.PaymentImg2}`} src={MasterCard} alt="mastercard" />
                                <img className={`${style.PaymentImg}`} src={paypal} alt="paypal" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
