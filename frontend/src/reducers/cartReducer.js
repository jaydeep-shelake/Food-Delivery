import { ADD_TO_CART, DELETE_CART, DELETE_ITEM, UPDATE_QTY } from "../actions/types";
const cartReducer=(state={cartItems:[]},action)=>{
 switch (action.type) {
     case ADD_TO_CART:
         const item = action.payload
         const currentItem = state.cartItems.find(x=>x.product=== item.product)
         if(currentItem){
             return {...state,cartItems:state.cartItems.map(x=>x.product===currentItem.product?{...item,qty:item.qty+x.qty}:x)}
         }
         else{
             return{...state,cartItems:[...state.cartItems,item]}
         }
     case UPDATE_QTY:
         const findItem =action.payload
        const findItemToUpDate =state.cartItems.find(x=>x.product=== findItem.product)
        if(findItemToUpDate){
            return{...state,cartItems:state.cartItems.map(x=>x.product===findItemToUpDate.product?{...findItem,qty:findItem.qty}:x)}
        }else{
            return{...state,cartItems:[...state.cartItems,findItem]}
        }
    case DELETE_ITEM:
        const id =  action.payload
       
        return{...state,cartItems:state.cartItems.filter(x=>x.product!==id)}
    case DELETE_CART:
        return{...state,cartItems:[]}
     default:
         return state
 }
} 

export default cartReducer