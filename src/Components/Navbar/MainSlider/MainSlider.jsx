import React from 'react';
import slide1 from '../../../Assets/images/slider-image-1.jpeg';
import slide2 from '../../../Assets/images/slider-image-2.jpeg';
import slide3 from '../../../Assets/images/slider-image-3.jpeg';
import banner2 from '../../../Assets/images/22e52a156603721.636a398863862.jpg';
import banner4 from '../../../Assets/images/240_F_618962412_ROMMGLWE3mJ0Uvdvwca8pdaCCzdBzR6d.jpg';
import style from '../MainSlider/MainSlider.module.css';
import Slider from "react-slick";
export default function MainSlider() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };



    return (
        <>



            <div className={`${style.marginTop} d-flex gx-0  ${style.padddLeftRight}`}>
                <div className="col-md-9 ">
                    <Slider {...settings}>
                        <img height={550} className={` w-100`} src={slide1} alt="grocery" />
                        <img height={550} className={`w-100  `} src={slide2} alt="grocery" />
                        <img height={550} className={` w-100`} src={slide3} alt="grocery" />
                    </Slider>
                </div>
                <div className="col-md-3 ">
                    <img height={275} className={` w-100`} src={banner2} alt="banner2" />
                    <img height={275} className={` w-100`} src={banner4} alt="banner4" />
                </div>
            </div>



        </>

    )
}
