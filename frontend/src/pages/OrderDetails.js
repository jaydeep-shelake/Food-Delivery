import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../actions/orders';
import OrderDetail from '../skeleton/OrderDetail';
import Message from '../components/Message'
import SideBar from '../components/SideBar';
const OrderDetails = () => {
    const params=useParams()
    const {id}=params;
    const dispatch = useDispatch()
    useEffect(()=>{
       dispatch(getOrderDetails(id))
    },[])

    const {order={},loading,}= useSelector(state=>state.orderDetails)
    const {sucess}=useSelector(state=>state.order)
    
    const {shippingAddress,orderItems,totalprice,shippingPrice,itemsPrice,_id,paymentMethod
    } =order 
  const [show,setShow]=useState(sucess)
    console.log(sucess)
  return (
      <>
    <div className='shipping'>
   <SideBar/>
{!loading?(<div className="shipping-details">
<div className="shippingshippingAddress">
<h3>ORDER DETAILS</h3>
<div className="add-sec-area">
    <h4 style={{margin:'20px 0'}}>Order ID:{_id}</h4>
    <h4>Shipping</h4>
      {shippingAddress&&(
          <div  className={`og-add`}>
             <p>{shippingAddress.name}</p>
             <span>{shippingAddress.address},{shippingAddress.town}</span>
             <span>{shippingAddress.city},{shippingAddress.state} -{shippingAddress.pinCode} </span>
             <span><b>Mobile No:</b>{shippingAddress.mobNo}</span>
            </div>
              )}
     </div>
     <h4>Products</h4>
                  <div className="cart-area">
                      
                  <div className="all-items">
                     {orderItems?.map((item)=>(
                         <div className='cart-card' key={item.product}>
                         <div className="img">
                            <img src={item.image} alt={item.name} />
                         </div>
                         <div className="des">
                            <h3>{item.name}</h3>
                            <p>qty:{item.qty}</p>
                            <p className='des'>{item.description?item.description:'Treat your taste buds with Double Pepper Barbecue Chicken, Peri-Peri Chicken, Chicken Tikka & Grilled Chicken Rashers'}</p>
                         </div>
                         <div className="price">
                           <h2><span>Rs.</span>{item.price}</h2>
                         </div>
                     </div>
                     ))}
                   </div>
                   </div>
                   <h4>Payment Method</h4>
                   <div className="payments-opts">
                 <div className="payment-method">
                 <div className='select-opt'>
                     <label htmlFor="cod">{paymentMethod?.toUpperCase()}</label>
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
                             <p><span>₹</span>{itemsPrice}</p>
                         </div>
                        
                         <div className="item">
                             <p>Delivery Charges</p>
                             <p>{shippingPrice===0?<span className='free'>Free</span>:<span>₹{shippingPrice}</span>}</p>
                         </div>
                     </div>
                     <div className="total">
                         <h3>Total</h3>
                         <h3><span>₹</span>{totalprice?.toFixed(2)}</h3>
                     </div>
                   </div>
     </div>
</div>):<OrderDetail/>}

</div>
<Message
 showModal={show}
 msg={"Order Placed Successfuly"}
 img={"https://cdn.dribbble.com/users/335541/screenshots/7102045/media/5b7237fe7bbfa31531d6e765576f1bc4.jpg?compress=1&resize=400x300"}
 type="error"
 closeModal={setShow}
/>
</>
  );
};
export default OrderDetails;
