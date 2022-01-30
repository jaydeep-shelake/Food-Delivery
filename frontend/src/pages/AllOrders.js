import React, { useEffect, useState } from 'react';
import LeftSide from '../components/LeftSide';
import SideBar from '../components/SideBar';
import Header from '../components/Header'
import pizza from '../apis/pizza';
import { Link } from 'react-router-dom';
import '../styles/allorders.css'
import { useSelector } from 'react-redux';
const AllOrders = () => {

  const user=useSelector(state=>state.user.user)
 const [orders,setOrders]=useState([])
  const getOrders = async()=>{
    const {data} =await pizza.get('/api/orders',{
      headers:{
         Authorization: `Bearer ${user.token}`
      }
   })
  //  console.log(data)
  setOrders(data)
  }

  useEffect(()=>{
     getOrders()
  },[])

  return(
      <>
      <SideBar/>
       <div className='mainarea all-oredrs'>
         <Header/>
         <div className="all-orders-area">
           <h2>My Orders</h2>
           <div className="display-orders">
           { orders.length>0?orders.map((order)=>(
               <Link to={`/order/${order?._id}`}><div className="order-detail-card" key={order?._id}>
               <div className="order-left-details">
                 {
                   order.orderItems?.map(item=>(
                    <div className='image-card' key={item?._id}>
                    <div className="img">
                      <img src={item?.image} alt="" />
                    </div>
                    <div className="details">
                     <h4>{item?.name}</h4>
                     <p>qty:{item?.qty}</p>
                     <p>place Date : {order?.createdAt}</p>
                    </div>
                    </div>
                   ))
                 
                }
                </div>
                 <div className="status">
                  <p>Placed on{order?.createdAt} </p>
                  <span>Your item has been placed.</span>
                 </div>
               </div></Link>
           )):<h1>No Past Orders</h1>
               
              }

           </div>
         </div>
        </div>
      <LeftSide/>
      </>
  );
};

export default AllOrders;
