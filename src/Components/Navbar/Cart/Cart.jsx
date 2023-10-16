import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { cartContext } from '../CartContext/CartContext'
import { FallingLines } from 'react-loader-spinner';
import '../../../Assets/Style/style.css';
import style from '../Cart/Cart.module.css';
import { Link } from 'react-router-dom';

export default function Cart() {

    let {getemptyCart, getLoggedUserCart, removeItem, updateProductQuantity, cancelCart } = useContext(cartContext);
    const [cartDetails, setCartDetails] = useState(null);
    const [emptyMsg, setemptyMsg] = useState('');


    // async function getEmpty(){
    //     let {data} = await getemptyCart();
    //     if(data.statusMsg === 'fail'){
    //         setemptyMsg(data.message);
    //     }
    // }

    async function getCart() {
        let { data } = await getLoggedUserCart();
        
        setCartDetails(data);
    }

    async function DelCart() {
        let x = await cancelCart();

        setCartDetails('');

    }

    async function removeCartItem(id) {
        let { data } = await removeItem(id);
        setCartDetails(data);
    }

    async function updateCount(id, count) {
        let { data } = await updateProductQuantity(id, count);
        setCartDetails(data);
    }


    useEffect(() => {
        getCart();
    }, [])





    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            {cartDetails ? <div className={`${style.margin} w-75  mx-auto p-3 bg-main-light rounded-2`}>
                <h3>Shopping Cart</h3>
                <h4 className="h6 text-main fw-bolder">Cart Items : {cartDetails.numOfCartItems}</h4>
                <h4 className="h6 text-main mb-3 fw-bolder">Total Cart Price : {cartDetails.data.totalCartPrice} EGP</h4>
                <Link to={'/address'}>
                <button className='btn brdr-main text-center d-block ms-auto  mb-2 payment-btn'>Check Out</button>
                </Link>

                {cartDetails.data.products.map((product) => <div key={product.product._id} className='row'>


                    <div className="col-md-1">
                        <img className='w-100 mb-4' src={product.product.imageCover} alt={product.product.title} />
                    </div>


                    <div className="col-md-11">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h3 className="h6">{product.product.title.split(' ').slice(0, 3).join(' ')}</h3>
                                <h6 className='text-main'>Price : {product.price} EGP</h6>
                            </div>
                            <div>
                                <button onClick={() => updateCount(product.product._id, product.count - 1)} className='btn brdr-main fw-bolder payment-btn'>-</button>
                                <span className='mx-2'>{product.count}</span>
                                <button onClick={() => updateCount(product.product._id, product.count + 1)} className='btn brdr-main fw-bolder payment-btn'>+</button>
                            </div>
                        </div>

                        <button onClick={() => removeCartItem(product.product._id)} className='btn p-0 m-0'><i className='fas fa-trash-can text-danger font-sm'></i> Remove</button>

                    </div>

                </div>)}

                <hr />
                <button onClick={() => DelCart() } className='btn brdr-main text-center d-block mx-auto payment-btn'>Clear Your Cart</button>
            </div>




                :<div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
                <h1>Fresh Cart</h1>
                <h2>Your Cart is Empty!</h2>
            </div>}



        </>
    )
}
