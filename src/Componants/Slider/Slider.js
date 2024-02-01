import React from 'react';
import './Slider.scss';
import {slider_img_1} from '../../utils/images' ;
const Slider = () => {
    return (
        <div className='hero-slider'>
            <div className='hero-slider-item'>
                <img src={slider_img_1} alt=''/>
            </div>
        </div>
    );
};

export default Slider;