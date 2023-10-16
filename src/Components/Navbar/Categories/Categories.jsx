import React from 'react'
import { Helmet } from 'react-helmet'
import aySora from '../../../Assets/images/blog-img-1.jpeg';
import aySora2 from '../../../Assets/images/blog-img-2.jpeg';
import { useQuery } from 'react-query';
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';


export default function Categories() {

    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }
    let { isLoading, data } = useQuery('categories', getCategories);

    let categories = data?.data.data;
    // console.log(categories);


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>


            <div className="container marginTop py-5">
                <div className="row gy-3">
                    {isLoading ? <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
                        <FallingLines
                            color="#4fa94d"
                            width="150"
                            visible={true}
                            ariaLabel='falling-lines-loading'
                        />
                    </div> : categories.map((category) => {
                        return <div key={category._id} className="col-md-3 ">
                            <div className="item m-2 border rounded-2">
                                <img height={350} className='w-100 ' src={category.image} alt={category.slug} />
                                <h2 className='text-center mt-2 mb-2'>{category.name}</h2>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}
