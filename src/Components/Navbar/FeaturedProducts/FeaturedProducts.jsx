import React, { useContext, useState } from 'react';
import style from '../FeaturedProducts/FeaturedProducts.module.css';
import axios from 'axios';
import '../../../Assets/Style/style.css';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import { cartContext } from '../CartContext/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../WishListContext/WishListContext';



export default function FeaturedProducts() {


    let {addToCart} = useContext(cartContext);
    let {addToWishList,removeWishListItem} = useContext(WishListContext);
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


    async function addWProduct(prodId){
        let response = await addToWishList(prodId);
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


    const [red,setRed] = useState(false);
    




    function getFeaturedProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }
    let { isLoading ,data} = useQuery('featuredProducts', getFeaturedProducts);

    return (
        <>
            {isLoading ? <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
                <FallingLines
                    color="#4fa94d"
                    width="150"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                />
            </div> : <div className={`container py-2 ${style.sectionMargin} ${style.padding}`}>
                <h2 className={`mb-5 text-center`}>Featured Products</h2>
                <div className="row gy-3">
                    {data?.data.data.map((product) => {
                        return <div key={product.id} className='col-md-3'>
                            <div className='product  cursor-pointer py-3 px-2'>
                                <Link to={`/productDetails/${product.id}`}>
                                    <img className='w-100' src={product.imageCover} alt={product.title} />
                                    <span className={`${style.categoNameColor} font-sm fw-bold`}>{product.category.name}</span>
                                    <h3 className='h6'>{product.title.split(" ").slice(0, 2).join(' ')}</h3>
                                    <div className='d-flex justify-content-between mt-3'>
                                        <span>{product.price} EGP</span>
                                        <span><i className='fas fa-star rating-color'></i> {product.ratingsAverage}</span>
                                        
                                    </div>
                                </Link>
                                <span onClick={()=>{
                                    addWProduct(product.id);}}><i className={`${red?`heartColor`:``}fa-solid fa-heart ${style.heartSize}`} ></i></span>
                                <button onClick={()=>{
                                    addProduct(product.id);
                                }} className='btn bg-Main text-white w-100 btn-sm mt-2'>Add to Cart</button>
                            </div>

                        </div>
                    })}
                </div>
            </div>}
        </>
    )
}
