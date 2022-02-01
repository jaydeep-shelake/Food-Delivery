import { ADDRESS_ERROR, ADD_WISHLIST_REQ, ADD_WISHLIST_SUCCESS, GET_WISHLIST } from "../actions/types";

export const wishlistReducer = (state={loading:false},action)=>{
 switch (action.type) {
     case ADD_WISHLIST_REQ:
         return {...state,loading:true,wishlistItems:action.payload} 
     case ADD_WISHLIST_SUCCESS:
         return{...state,loading:false,wishlistItems:action.payload}
     case GET_WISHLIST:
         return{...state,loading:false,wishlistItems:action.payload}
     case ADDRESS_ERROR:
         return{...state,loading:false,error:action.payload}
     default:
         return state
 }
}