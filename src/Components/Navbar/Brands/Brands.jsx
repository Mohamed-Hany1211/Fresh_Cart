import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { BrandsContext } from '../BrandContext/BrandContext';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';


export default function Brands() {


    function getBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    }
    let { isLoading, data } = useQuery('Brands', getBrands);

    let brands = data?.data.data;




    return (
        <>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>



            <div className="container marginTop py-5">
                <h2 className='text-center text-main fa-3x mb-3'>All Brands</h2>
                <div className="row gy-3">
                    {isLoading ? <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
                        <FallingLines
                            color="#4fa94d"
                            width="150"
                            visible={true}
                            ariaLabel='falling-lines-loading'
                        />
                    </div> : brands.map((brand) => {
                        return <div  key={brand._id} className="col-md-3 ">
                            <Link to={`/brandsDetails/${brand._id}`}><div className="item m-2 border rounded-2">
                                <img height={300} className='w-100 ' src={brand.image} alt={brand.slug} />
                            </div></Link>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}
