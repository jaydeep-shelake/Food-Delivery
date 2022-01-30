
import { ADDRESS_ERROR, ADD_ADDRESS, DELETE_ADDRESS, GET_ADDRESS, SELECET_ADDRESS, UPDATE_ADDRESS } from "../actions/types";
export const addressReducer=(state={addressItems:[]},action)=>{
  switch (action.type) {
      case ADD_ADDRESS:
        return {...state,addressItems:[...state.addressItems,action.payload]}
      case GET_ADDRESS:
        return {...state,addressItems:[...action.payload],slectedAddress:action.payload[0]}
      case DELETE_ADDRESS:
        const id = action.payload.id
        return {addressItems:state.addressItems.filter(x=>x._id!==id)}
      case SELECET_ADDRESS:
         return {...state,slectedAddress:action.payload} 
      case UPDATE_ADDRESS:
        const item = action.payload
        const findItemToUpDate =state.addressItems.find(x=>x._id=== item._id)
        if(findItemToUpDate){
          return{...state,addressItems:state.addressItems.map(x=>x._id===findItemToUpDate._id?item:x)}   
        }
        else{
          return{...state,addressItems:[...state.addressItems,item]}
        }
      case ADDRESS_ERROR:
        return{...state,error:action.payload}
      default:
          return state
  }
}
