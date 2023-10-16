import React, { useContext, useEffect, useRef, useState } from 'react';
import style from '../Products/Products.module.css';
import axios from 'axios';
import '../../../Assets/Style/style.css';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { cartContext } from '../CartContext/CartContext';
import { WishListContext } from '../WishListContext/WishListContext';
export default function Products() {

    let [searchData, setSearchData] = useState([]);
    let searchInput = useRef("");

    async function getAllProducts(){
        let resp = await  axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
        setSearchData(resp?.data.data);
        return resp;

    }
    
    let {isLoading,data} = useQuery('Products',getAllProducts);

    



    
    //search
    function handleChange() {

        if (searchInput.current.value != "") {

            let temp = data?.data.data.filter(function (item) {
                return item.title.split(" ").slice(0, 2).join(' ').toLowerCase().includes(searchInput.current.value.toLowerCase());
            })
            setSearchData(temp)
        } else {
            setSearchData(data?.data.data);
}
};








    let {addToCart} = useContext(cartContext);
    let {addToWishList} = useContext(WishListContext);

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


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Products</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            {isLoading ? <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
                <FallingLines
                    color="#4fa94d"
                    width="150"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                />
            </div> : <div className={`container py-2 ${style.sectionMargin} ${style.padding}`}>
                <input onKeyUp={handleChange} ref={searchInput} className='my-5 mx-auto w-75 form-control' type="text" name="" id="" placeholder='Search...'/>
                <div className="row gy-3">
                    {searchData.map((product) => {
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
                                    addWProduct(product.id);
                                }} className=' ms-auto'><i className={`fa-solid fa-heart ${style.heartSize}`}></i></span>
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
