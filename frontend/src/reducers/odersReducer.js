import { CREATE_ORDER, CREATE_ORDER_ERROR, CREATE_ORDER_REQUEST, ORDER_DETAIlS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQURST, PAYMENT_METHOD } from "../actions/types";

export const orderReducer=(state={loading:false,sucess:false},action)=>{
           switch (action.type) {
               case PAYMENT_METHOD:
                  return{...state,pyamentMethod:action.payload}
               case CREATE_ORDER_REQUEST:
                  return{...state,loading:true}
               case CREATE_ORDER:
                 return {...state,loading:false,sucess:true,order:action.payload} 
               case CREATE_ORDER_ERROR:
                  return{...state,loading:false,sucess:false,error:action.payload}  
               default:
                return state
           }
}

export const orderDetail=(state={loading:false},action)=>{
   switch (action.type) {
      case ORDER_DETAILS_REQURST:
          return{loading:true}   
      case ORDER_DETAIlS:
         return{loading:false,order:action.payload}
      case ORDER_DETAILS_FAIL:
         return{loading:false,error:action.payload}
      default:
         return state
   }
}