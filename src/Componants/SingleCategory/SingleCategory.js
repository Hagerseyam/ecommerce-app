import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsModalVisible, setModalData } from '../store/ModalSlice';
import { formatPrice } from '../../utils/helpers';
import SingleProduct from '../SingleProduct/SingleProduct';
import Error from '../Error/Error';
import Loader from '../Loader/Loader';
import {STATUS} from "../../utils/status";

const SingleCategory = ({products, status}) => {
    const dispatch = useDispatch();
    const {isModalVisible} = useSelector((state) => state.modal);

    const viewModalHandler = (data) => {
        dispatch(setModalData(data));
        dispatch(setIsModalVisible(true));
    }
    // Check if products array is not empty before accessing its first element
if (products && products.length > 0) {
    // Access the first element of the products array
    const firstProduct = products[0];
    const categoryValue = firstProduct.category;
  
    // Now you can safely use categoryValue
  } else {
    // Handle the case where products array is empty
    console.error("The products array is empty.");
  }
  

    if(status === STATUS.ERROR) return (<Error />);
    if(status === STATUS.LOADING) return (<Loader />);

    return (
        <section className='cat-single py-5 bg-ghost-white'>
            { isModalVisible && <SingleProduct />}

            <div className='container'>
                <div className='cat-single-content'>
                    <div className='section-title'>
                        {/* <h3 className='text-uppercase fw-7 text-regal-blue ls-1'>{products[0].category.name}</h3> */}
                    </div>
                    <div className='product-items grid'>
                        {
                            products.map(product => (
                                <div className='product-item bg-white' key = {product.id} onClick = {() => viewModalHandler(product)}>
                                    <div className='product-item-img'>
                                        <img src = {product.images[0]} alt = "" />
                                        <div className = "product-item-cat text-white fs-13 text-uppercase bg-gold fw-6">{product.category.name}</div>
                                    </div>
                                    <div className='product-item-body'>
                                        <h6 className = "product-item-title text-pine-green fw-4 fs-15">{product.title}</h6>
                                        <div className = "product-item-price text-regal-blue fw-7 fs-18">{formatPrice(product.price)}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SingleCategory;