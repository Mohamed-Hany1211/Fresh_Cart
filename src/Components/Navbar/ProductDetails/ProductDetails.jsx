import React from 'react';
import style from '../ProductDetails/ProductDetails.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FallingLines } from 'react-loader-spinner';
import { Helmet } from "react-helmet";
import ReactDOM from 'react-dom';
import ReactSwipe from 'react-swipe';
export default function ProductDetails() {

    let params = useParams();

    function getSpecificProductData(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }

    let { isLoading, data } = useQuery('productDetails', () => getSpecificProductData(params.id));

    let details = data?.data.data;



    return (
        <>
            {details ? <div className={`container mb-5 ${style.marginTop}`}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{details.title}</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <div className="row py-2 align-items-center">
                    {details.images.length ? <div className="col-md-4">
                        <div id="carouselExample" className="carousel slide ">
                            <div className="carousel-inner">
                            {details.images?.map((image,index) => {
                                    return <div className={`carousel-item ${index===0?'active':''}  mt-5 mb-5`}>
                                        <img src={image} className="d-block w-75" alt={details.title} />
                                    </div>
                                })}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span className={`${style.sliderBtnColor} carousel-control-prev-icon w-50`} aria-hidden="true" />
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span className={`${style.sliderBtnColor} carousel-control-next-icon w-50`} aria-hidden="true" />
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                    </div> : ''}

                    <div className="col-md-8">
                        <h1 className='h5'>{details.title}</h1>
                        <p>{details.description}</p>
                        <h6>{details.category.name}</h6>
                        <div className='d-flex justify-content-between'>
                            <span>{details.price} EGP</span>
                            <span><i className='fas fa-star rating-color'></i> {details.ratingsAverage}</span>
                        </div>
                        <button className='btn bg-Main text-white w-100 mt-3'>Add to Cart</button>
                    </div>
                </div>
            </div> : <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
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
