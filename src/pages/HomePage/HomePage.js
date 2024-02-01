import React, { useEffect } from 'react';
import Slider from '../../Componants/Slider/Slider.js';
import './HomePage.scss';
import Category from '../../Componants/Category/Category.js';
import {fetchProducts} from '../../Componants/store/ProductSlice.js'
import { fetchCategories, fetchProductsByCategory } from '../../Componants/store/CategorySlice.js';
import { useDispatch, useSelector } from 'react-redux';
import SingleCategory from '../../Componants/SingleCategory/SingleCategory.js'
import ProductList from '../../Componants/ProductList/ProductList.js'

const HomePage = () => {
    const dispatch= useDispatch();
    const {data:categories, status : categoryStatus} = 
    useSelector((state)=>
     state.category);

    const {catProductAll: productsByCategory, catProductAllStatus} = 
    useSelector((state) => state.category);

    const {data: products, status: productStatus} = useSelector((state) => state.product);

    useEffect(() => {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
      dispatch(fetchProductsByCategory(1, 'all'));
      dispatch(fetchProductsByCategory(2, 'all'));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);  
    
    return (
        <div className='home-page'>
            <Slider/>
            <Category categories = {categories} status = 
            {categoryStatus} />
            
            <ProductList products={products} status = {productStatus}/>
            <section>
              {
                productsByCategory[0] && <SingleCategory 
                products = {productsByCategory[0]} status =
                {catProductAllStatus}/>
              }
            </section>

            <section>
              {
                productsByCategory[1] && <SingleCategory 
                products = {productsByCategory[1]} status =
                {catProductAllStatus}/>
              }
            </section>
      
        </div>
    );
};

export default HomePage;