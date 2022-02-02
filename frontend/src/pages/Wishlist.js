import React,{useEffect, useState} from 'react';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import LeftSide from '../components/LeftSide';
import ProductCard from '../components/products/ProductCard';
import Message from '../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonArticle from '../skeleton/SkeletonArticle';
import { getWishlist } from '../actions/wishlist';
const Wishlist = () => {
    const error = useSelector(state=>state.wishlist?.error)
//    console.log(query)
    const [show,setShow]=useState(error?true:false)
    const data = useSelector(state=>state.wishlist.wishlistItems)
    const loading = useSelector(state=>state.wishlist.loading)
    const dispatch =useDispatch()

    useEffect(()=>{
      dispatch(getWishlist())
    },[])
  return (
      <>
      <SideBar/>
       <div className='mainarea  main-search'>
         <Header/>
        
         <div className="all-list search">
         {data.length>0?(<div className='all-products'>
          {loading?(
          <>
            {[1,2,3,4,5,6].map(n=><div className='product-card' key={n}><SkeletonArticle key={n}/></div>)}
          </>
          ):<ProductCard product={data?data:[]}/>}
          <Message showModal={show}
          msg={"Opps!,Something went wrong"}
          img={"https://image.flaticon.com/icons/png/512/835/835408.png"}
          type="error"
          closeModal={setShow}
          />  
        </div>):(
        <div>
           <img src="https://aquamarineexotic.com/adminpanel/assets/images/empty-wishlist.png" alt="" />
         </div>
            )}
            </div>
         </div>
         <LeftSide/>
      </>
  );
};

export default Wishlist;
