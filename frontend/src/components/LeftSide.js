import React, { useState } from 'react'
import '../styles/leftside.css'
import {BsCart3,BsFillArrowRightSquareFill} from 'react-icons/bs'
import {IoNotificationsOutline} from 'react-icons/io5'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import CartItemCard from './CartItemCard'
import delivery from '../assests/delivery.png'
const LeftSide = ({data ,show}) => {
    const cartItems = useSelector(state=>state.cart.cartItems)
    const user = useSelector(state=>state.user)
  const [showNoti,setShow]=useState(false)
    // console.log(cartItems)
    

    return (
        <div className='leftside'>
            <div className="header">
               {show&&<Link to="/add-product"> <button style={{marginRight:"10px"}}>Add Product</button></Link>}
                {show?null:(<div className="user-info">
                    {
                        user?.user?(
                            <Link to="/profile"> <div className='user-profile-icon'>{user.user.name.charAt(0)}</div></Link>
                        ):(
                            <Link to="/signin"> <button>Login</button></Link>
                        )
                    }
                </div>)}
                  {show?null:(<Link to="/cart"><div className="icon">
                      <span>{cartItems?cartItems?.length:0}</span>
                      <BsCart3/>
                  </div></Link>)}
                  <div className="icon" onClick={()=>setShow(!showNoti)} >
                    
                  {  data?.length===undefined?null:<span>{data?.filter(item=>item.inStockItem<=3).length} </span>}
                      <IoNotificationsOutline/>
                      
                  </div>
                  {showNoti&&(<div className='waring-noti'>
                  {
                        data?.map((item,i)=>{
                            if(item.inStockItem<=3){
                                return <div  key={i}>{item.name} has came to end</div>
                            }
                            
                        })
                      }
                  </div>)}
            </div>
           { show?null:(<div className="sidebar-msg">
                <div className="img">
                    <img src={delivery} alt="" />
                </div>
                <div className="text">
                    <h2>Safe Delivery <span>@</span> your doors</h2>
                </div>
            </div>)}
           { show?null:(<div className="side-cart-area">
                <div className="text">
                    <h4>Order Menu</h4>
                    <Link to='/cart'><p>Veiw All <BsFillArrowRightSquareFill/></p></Link>
                </div>
            <div className='cart-area'>
                      <div className="all-items side-cart">
                       {cartItems.slice(0,3).map((item)=>(
                           <CartItemCard key={item.product} item={item}/>
                       ))}
                      {cartItems.length>0&&<Link to="/cart"><button>PROCEED TO CHECKOUT</button></Link>}
                      </div>
                </div>
            </div>)}
           
            
        </div>
    )
}

export default LeftSide
