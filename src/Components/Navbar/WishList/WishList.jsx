import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FallingLines } from 'react-loader-spinner';
import '../../../Assets/Style/style.css';
import style from '../WishList/WishList.module.css';
import { Link } from 'react-router-dom';
import { WishListContext } from '../WishListContext/WishListContext';
import { cartContext } from '../CartContext/CartContext';
import toast from 'react-hot-toast';
export default function WishList() {

    let {getloggedUserWishList,removeWishListItem} = useContext(WishListContext);
    let {addToCart} = useContext(cartContext);

    async function addProduct(prodId){
        let response = await addToCart(prodId);
        if(response.data.status==='success'){
            toast.success('product successfully added :)',{
                duration:1500,
                position:'top-right',
            });
        }else{
            toast.error('error in adding product :(',{
                duration:1500,
                position:'top-right',
            });
        }
    }

    const [WishDetails,setWishDetails] = useState(null);

    async function getWishList(){
        let {data} = await getloggedUserWishList();
        setWishDetails(data);
    }

    async function removeItem(id){
        let {data} = await removeWishListItem(id);
        setWishDetails(data);
    }

    

    useEffect(()=>{
        getWishList();
    },[])

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>WishList</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            {WishDetails ? <div className={`${style.margin} w-75  mx-auto p-5 bg-main-light rounded-2 `}>
                <h3>My wish List</h3>
                {WishDetails.data.map((product) => <div key={product._id} className='row'>
                    <div className="col-md-2">
                        <img className='w-100 mb-4' src={product.imageCover} alt={'product.title'} />
                    </div>


                    <div className="col-md-10">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h3 className="h6 mt-4">{product.title.split(' ').slice(0, 3).join(' ')}</h3>
                                <h6 className='text-main'>Price : {product.price} EGP</h6>
                            </div>
                            <div>
                                <button onClick={()=>{
                                    addProduct(product._id);
                                }} className='btn brdr-main fw-bolder '>Add to Cart</button>
                            </div>
                        </div>

                        <button onClick={() => removeItem(product._id)} className='btn p-0 m-0'><i className='fas fa-trash-can text-danger font-sm'></i> Remove</button>

                    </div>

                </div>)}

                <hr />
            </div>



                : <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
                    <FallingLines
                        color="#4fa94d"
                        width="150"
                        visible={true}
                        ariaLabel='falling-lines-loading'
                    />
                </div>}



        </>
    )
}
