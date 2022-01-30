import { ERROR, FETCH_PIZZAS, FETCH_PIZZAS_SUCCESS } from "../actions/types";


const pizzaReducer=(state={data:[],loading:true},action)=>{
     switch (action.type) {
         case FETCH_PIZZAS:
             return {loading:true,data:action.payload}
         case FETCH_PIZZAS_SUCCESS:
             return{loading:false,data:action.payload}
         case ERROR:
             return {loading:false,error:action.payload,data:[]}         
         default:
             return state
     }
}

export default pizzaReducer