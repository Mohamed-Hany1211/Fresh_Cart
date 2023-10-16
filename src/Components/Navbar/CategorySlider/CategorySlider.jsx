import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import Slider from "react-slick";
import style from '../CategorySlider/CategorySlider.module.css';
export default function CategorySlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7
    };

    function getCategories(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }

    let {isLoading,data,isError} = useQuery('CategoriesSlider',getCategories);
    let categories = data?.data.data;
    
    return (
        <>
        <div className={`${style.padddLeftRight}`}>
            <h2 className='mt-2'>Shop Popular Categories</h2>
        {categories?<Slider className={`${style.marginTop}`} {...settings}>
            {categories.map((category)=> <img height={270} className='w-100' key={category._id} src={category.image}  />)}
        </Slider>:''}
        
        </div>
        
        </>
    )
}
