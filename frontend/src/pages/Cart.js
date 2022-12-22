import React from 'react'
import { useSelector } from 'react-redux'
import '../styles/cart.css'
import SideBar from '../components/SideBar'
import emtycart from '../assests/emtycart.gif'
import CartItemCard from '../components/CartItemCard'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
    const cartItems = useSelector(state=>state.cart.cartItems)
    const cartPrice=cartItems.reduce((total,itm)=>total+itm?.price*itm?.qty,0)
    const deleviryPrice = (cartPrice>500||cartPrice===0)?0:50
    const discount = 0;
    const totalPrice= (cartPrice+deleviryPrice)-discount;
    const auth = useSelector(state=>state.user.user)
    const navigate = useNavigate()
    const checkoutHandler =()=>{
        if(auth){
            navigate(`/shipping`)
        }
        else{
            navigate('/signin?redirect=shipping')
        }
    }
    return (
        <>
        <SideBar/>
        <div className='cart-screen'>
            <h1>MY CART</h1>
            {
                cartItems?.length>0?(
                  <div className='cart-area'>
                      <div className="all-items">
                       {cartItems.map((item)=>(
                           <CartItemCard key={item.product} item={item}/>
                       ))}
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
                      <button onClick={checkoutHandler} disabled={totalPrice===0?true:false}>PROCEED TO CHECKOUT</button>
                      </div>
                  </div>
                ):(
                    <>
                    <img src={emtycart} alt="" />
                    <h2>Hey, it feels so light!</h2>
                    <p>There is nothing in your bag. Let's add some items.</p>
                    <Link to="/"><button>Go Back</button></Link>
                    </>
                )
            }
       
        </div>
        </>
    )
}

export default Cart
