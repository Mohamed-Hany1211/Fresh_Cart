import React, { useContext } from 'react';
import { BrandsContext } from '../BrandContext/BrandContext';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';

export default function Brands() {

    let params = useParams();

    function getSpecificBrandData(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    }

    let { isLoading, data } = useQuery('BrandsDetails', ()=>{
        return getSpecificBrandData(params.id);
    });

    let brandDetail = data?.data.data;




    return (
        <>

        {isLoading?<div className="w-100 vh-100 d-flex justify-content-center align-items-center">
                <FallingLines
                    color="#4fa94d"
                    width="150"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                />
            </div>:<div className='w-100 vh-100 d-flex flex-column justify-content-center align-items-center'>
            <h1 className="brand mb-3 text-main">{brandDetail.name}</h1>
            <img src={ brandDetail.image} alt={brandDetail.slug} />
            
        </div>}

        

        </>
    )
}
