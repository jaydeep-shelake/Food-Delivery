import React,{useEffect,useState} from 'react'
import { FaStar ,FaStarHalfAlt,FaRegStar} from 'react-icons/fa';
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai';
import {IoMdAdd} from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../actions/cart';
import { addToWishlist ,deleteItemFromWishlist,getWishlist} from '../../actions/wishlist';
import { useLocation } from 'react-router-dom';
import Spinner from '../Spinner';
const ProductCard = ({product}) => {
    //   const navigate = useNavigate()
      const user = useSelector(state=>state.user.user)
      const wishlist= useSelector(state=>state.wishlist)
      const [currenItemClicked,setCurrenItem]=useState()
    //   console.log(cart)
      const dispatch =useDispatch()
    const cartHandler =(item)=>{
         dispatch(addToCart(item))
        //  navigate('/cart')
    }

    const pathname= useLocation().pathname
    

    const handleWishlist=(item)=>{
        setCurrenItem(item._id)
     dispatch(addToWishlist({
         name:item?.name,
         image:item?.image,
         rating:item?.rating,
         price:item?.price,
         _id:item?._id,
         description:item?.description
    }))
    }
    const handleRemoveWishlist=(id,i)=>{
        setCurrenItem(id)
     dispatch(deleteItemFromWishlist(id))
    }
    useEffect(()=>{
       dispatch(getWishlist())
    },[])
 
    const getStarts=(rating)=>{
        if(rating>4){
            return (<><FaStar/><FaStar/><FaStar/><FaStar/><FaStar/></>);
        }
        if(rating===4 ){
            return (<><FaStar/><FaStar/><FaStar/><FaStar/><FaRegStar/></>);
        }
        if(rating>3){
            return (<><FaStar/><FaStar/><FaStar/><FaStarHalfAlt/><FaRegStar/></>);
        }
        if(rating===3){
            return (<><FaStar/><FaStar/><FaStar/><FaRegStar/> <FaRegStar/></>);
        }
        
    }

    const getState=(item,i)=>{
        // console.log(wishlist?.wishlistItems?.productId===item._id)
      
      if(wishlist.loading===true && item._id===currenItemClicked){
          return <Spinner color={'#eb3d34'}/>
      }
      if((wishlist.wishlistItems?.find(x=>x.product === item._id)&&wishlist.wishlistItems?.find(x=>x.userId === user?._id))&&item._id===i){
        return <AiFillHeart/>
    }
    if(wishlist.wishlistItems?.find(x=>x.product !== item._id) && wishlist.loading===false){
        return <AiOutlineHeart/>;
      }
      else{
        return <AiOutlineHeart/>;

      }
     //61e3cbffaba4686f0942e2f1
      
    }
    return (
        <>
            {
                product?.map((item,i)=>(
                  <div key={i} className='product-card'>
                      {pathname!=="/wishlist"&&<div className="love" value={item._id} onClick={(e)=>wishlist?.wishlistItems?.find(x=>x.product=== item._id)?handleRemoveWishlist(item._id) :handleWishlist(item)}>
                          {getState(item,item._id)}
                      </div>}
                      <div className="img">
                          <img src={item?.image} alt="" />
                      </div>
                      <div className="des">
                        <h3>{item?.name}</h3>
                        <div className='starts'>{getStarts(item?.rating)}</div>
                        <p className='price'> <span>Rs.</span>{item?.price}</p>
                      </div>
                      <div className="add-button" onClick={()=>cartHandler(item)}>
                          <IoMdAdd/>
                      </div>
                  </div>
                ))
            }
        </>
    )
}

export default ProductCard
