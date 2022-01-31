import React,{useState,useEffect} from 'react'
import ProductCard from './ProductCard'
import {useDispatch, useSelector } from 'react-redux';
import SkeletonArticle from '../../skeleton/SkeletonArticle';
import { fetchPizzas } from '../../actions';
import Message from '../Message';
const Product = ({category}) => {
  const dispatch=useDispatch()
  const allPizzas= useSelector(state=>state.allPizza)
  const {loading,error,data}=allPizzas
// console.log(category)
  const [show,setShow]=useState(error)
    useEffect(()=>{
      if(category){
        dispatch(fetchPizzas(category))
      }
    },[category])
    
    return (
        <div className='all-products'>
          {data.length===0||loading?(
          <>
            {[1,2,3].map(n=><div className='product-card' key={n}><SkeletonArticle key={n}/></div>)}
          </>
          ):<ProductCard product={data}/>}
          <Message showModal={show}
          msg={"Opps!,Something went wrong"}
          img={"https://image.flaticon.com/icons/png/512/835/835408.png"}
          type="error"
          closeModal={setShow}
          />  
        </div>
    )
}

export default Product
