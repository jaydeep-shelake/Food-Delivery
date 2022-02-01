import React,{useEffect} from 'react'
import { FaStar ,FaStarHalfAlt,FaRegStar} from 'react-icons/fa';
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom'
import {IoMdAdd} from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../actions/cart';
import { addToWishlist ,getWishlist} from '../../actions/wishlist';
import Spinner from '../Spinner';
const ProductCard = ({product}) => {
      const navigate = useNavigate()
      const cart = useSelector(state=>state.cart)
      const wishlist= useSelector(state=>state.wishlist)
    //   console.log(cart)
      const dispatch =useDispatch()
    const cartHandler =(item)=>{
         dispatch(addToCart(item))
        //  navigate('/cart')
    }

    const handleWishlist=(item)=>{
     dispatch(addToWishlist({
         name:item?.name,
         image:item?.image,
         rating:item?.rating,
         price:item?.price,
         _id:item?._id,
         description:item?.description
    }))
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
        console.log(wishlist?.wishlistItems?.productId===item._id)
      if(wishlist.loading===false){
          return <AiOutlineHeart/>
      }
      if(wishlist.loading===true && item._id===i){
          return <Spinner color={'#eb3d34'}/>
      }
      if(wishlist?.wishlistItems?.productId===item._id){
          return <AiFillHeart/>
      }
      
    }
    return (
        <>
            {
                product?.map((item,i)=>(
                  <div key={i} className='product-card'>
                      <div className="love" onClick={()=>handleWishlist(item)}>
                          {getState(item,item._id)}
                      </div>
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
