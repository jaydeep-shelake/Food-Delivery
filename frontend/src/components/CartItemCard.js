import React,{useState} from 'react'
import {MdDelete} from 'react-icons/md'
import {IoMdAdd,IoMdRemove} from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { deleteItem, upadteCart } from '../actions/cart'

const CartItemCard = ({item}) => {
    const [qty,setQty]=useState(item.qty)
    const dispatch = useDispatch()
    if(qty<1){
     setQty(1)
    }
 const increaseQty=()=>{
    setQty(qty+1)
    dispatch(upadteCart(item,Number(qty+1)))

 }
 const decreaseQty=()=>{
    setQty(qty-1)
    dispatch(upadteCart(item,Number(qty-1)))
 }
   
const reomveFormCartHandler =()=>{
// delte action
dispatch(deleteItem(item.product))
}

    return (
        <div className='cart-card'>
            <div className="img">
               <img src={item.image} alt={item.name} />
            </div>
            <div className="des">
               <h3>{item.name}</h3>
               <p>qty:{item.qty}</p>
               <div className="handle">
                   <div className="qty">
                       <div className='btn' onClick={decreaseQty}><IoMdRemove/></div>
                       <div className='item-qty'>{qty}</div>
                       <div className='btn' onClick={increaseQty}><IoMdAdd/></div>
                   </div>
                   <div className="delete" onClick={reomveFormCartHandler}>
                     <MdDelete/>
                   </div>
               </div>
            </div>
            <div className="price">
              <h2><span>Rs.</span>{item.price}</h2>
            </div>
        </div>
    )
}

export default CartItemCard
