import React, {useEffect} from 'react';
import '../CartPage/CartPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import {getCartTotal} from '../../Componants/store/CartSlice';
import {formatPrice} from '../../utils/helpers'
import './checkout.scss'
     const Checkout = () => {
     const dispatch = useDispatch();
     const {data: cartProducts, totalAmount, deliveryCharge} =
     useSelector(state => state.cart);
     useEffect(() => {
        dispatch(getCartTotal());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [useSelector(state => state.cart)]); 

         const emptyCartMsg = <h4 className='text-red fw-6'>No items found!</h4>;


         const addAddress = async () => {
            try {
              const response = await fetch('/stripe-checkout', {
                method: 'post',
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify({
                  items: JSON.parse(localStorage.getItem('cart'))
                })
              });
          
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
          
              const url = await response.json();
              console.log(url);
            } catch (error) {
              console.error('Error during fetch:', error);
            }
          };
          



    return (  
        
        <div className = "cart-page">
        <div className = "container">
          <div className = "breadcrumb">
            <ul className = "breadcrumb-items flex">
              <li className = "breadcrumb-item">
                <Link to = "/">
                  <i className = "fas fa-home"></i>
                  <span className = "breadcrumb-separator">
                    <i className = "fas fa-chevron-right"></i>
                  </span>
                </Link>
              </li>
              <li>Checkout</li>
            </ul>
          </div>
        </div>
        <div className='bg-ghost-white py-5'>
            <div className='container'>
                <div className='section-title bg-ghost-white'>
                    <h3 className = "text-uppercase fw-7 text-regal-blue ls-1">Your Order and address</h3>
                </div>
                {
                    cartProducts.length === 0 ? emptyCartMsg : (
                        <div className = "cart-content grid">
                            <div className='cart-left'>
                                <div className = "cart-items grid">
                                    {
                                        cartProducts.map(cartProduct => (
                                            <div className='cart-item grid' key = {cartProduct.id}>
                                                <div className='cart-item-img flex flex-column bg-white'>
                                                    <img src = {cartProduct.images[0]} alt = {cartProduct.title} />

                                                </div>

                                                <div className='cart-item-info'>
                                                    <h6 className='fs-16 fw-5 text-light-blue'>{cartProduct.title}</h6>
                                                    <div className = "qty flex">
                                                        <span className = "text-light-blue qty-text">Qty: </span>
                                                        <div className = "qty-change flex">

                                                        <span className = "qty-value flex flex-center">{cartProduct.quantity}</span>
                        
                                                        </div>
                                                    </div>
                                                    <div className = "flex flex-between">
                                                        <div className='text-pine-green fw-4 fs-15 price'>Price : {formatPrice(cartProduct.price)}.00</div>
                                                        <div className='sub-total fw-6 fs-18 text-regal-blue'>
                                                            <span>Sub Total: </span>
                                                            <span className=''>{formatPrice(cartProduct.totalPrice)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                               
                            </div>
                            <div className='cart-right2 bg-white'>
                                <div className = 'cart-summary2 text-light-blue'>
                  
                                    <div className='cart-summary2-total flex flex-between fs-18'>
                                        <span className='fw-6'>Grand Total: </span>
                                        <span className='fw-6'>{formatPrice(totalAmount + deliveryCharge)}</span>
                                    </div>
                                    <div className='cart-summary2-btn'>
                                        <button onClick={addAddress} type = "button" className='btn-secondary'>Place order</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
      </div>

    );
};

export default Checkout;