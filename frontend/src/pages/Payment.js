import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation ,useNavigate} from 'react-router-dom';
import { selectPayment } from '../actions/orders';
const Payment = () => {
  const location = useLocation();
    const path = location.pathname
    const navigate = useNavigate()
    const dispatch =useDispatch()
    const user = useSelector(state=>state.user.user)
    const cartItems = useSelector(state=>state.cart.cartItems)
    const cartPrice=cartItems.reduce((total,itm)=>total+itm?.price*itm?.qty,0)
    const deleviryPrice = (cartPrice>500||cartPrice===0)?0:50
    const discount = 0;
    const totalPrice= (cartPrice+deleviryPrice)-discount;
     const [paymentType,setPaymentType]=useState('COD')
    const handlePlaceOrder =()=>{
      dispatch(selectPayment(paymentType))
      navigate('/order')
    }

    console.log(paymentType)

    useEffect(()=>{
      if(!user){
          navigate('/signin')
      }
  },[])

  return (
  <div className='shipping'>
       <div className="progress">
        <div className="status">
            <p>Bag</p>
            <div className={`divider`}></div>
            <p className={` ${path==='/shipping'&& 'active'}`}>Shipping</p>
            <div className="divider"></div>
           <p className={` ${path==='/payment'&& 'active'}`}>Payment</p>
           <div className="divider"></div>
           <p className={` ${path==='/order'&& 'active'}`}>Order</p>

        </div>
   </div>
   <div className="shipping-details">
   <div className="address">
   <h3>Select Payment type</h3>
   <div className="payments-opts">
     <div className="payment-method">
       <div className='select-opt' onClick={()=>setPaymentType("COD")}>
         <input  type="radio" value="COD" name="payment" id="cod" checked />
         <label htmlFor="cod">CASH ON DELIVERY</label>
       </div>
       <div className='select-opt' onClick={()=>setPaymentType("razorpay")}>
         <input  type="radio" value="paypal" name="payment" id="paypal" />
         <label htmlFor="paypal">RAZORPAY</label>
       </div>
       
     </div>
   </div>
   </div>
   <div className="checkout-area">
                      <div className="billing">
                        <h4>PRICE DETAILS</h4>
                        <div className="details">
                            <div className="item">
                                <p>Price</p>
                                <p><span>₹</span>{cartPrice}</p>
                            </div>
                            
                            <div className="item">
                                <p>Delivery Charges</p>
                                <p>{deleviryPrice===0?<span className='free'>Free</span>:<span>₹{deleviryPrice}</span>}</p>
                            </div>
                        </div>
                        <div className="total">
                            <h3>Total</h3>
                            <h3><span>₹</span>{totalPrice}</h3>
                        </div>
                      </div>
                      <button onClick={handlePlaceOrder} disabled={totalPrice===0?true:false}>CONTINUE</button>
        </div>
   </div>

  </div>
  );
};

export default Payment;
