import { ADD_WISHLIST_ERROR, ADD_WISHLIST_REQ, ADD_WISHLIST_SUCCESS, DELETE_WISHLIST_ITEM, GET_WISHLIST } from "../actions/types";

export const wishlistReducer = (state={loading:false,wishlistItems:[]},action)=>{
 switch (action.type) {
     case ADD_WISHLIST_REQ:
         return {...state,loading:true} 
     case ADD_WISHLIST_SUCCESS:
         return{...state,loading:false,wishlistItems:[...state.wishlistItems,action.payload]}
     case GET_WISHLIST:
         return{...state,loading:false,wishlistItems:action.payload}
    case DELETE_WISHLIST_ITEM:
        const id=action.payload
        return{...state,loading:false,wishlistItems:state?.wishlistItems.filter(item=>item.product!==id)}
     case ADD_WISHLIST_ERROR:
         return{...state,loading:false,error:action.payload}
     default:
         return state
 }
}