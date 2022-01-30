import pizza from "../apis/pizza"
import { ERROR, FETCH_PIZZAS, FETCH_PIZZAS_SUCCESS } from "./types"

export const fetchPizzas=(category)=>async dispatch=>{
  dispatch({type:FETCH_PIZZAS,payload:[]})
  try{
    const {data} = await pizza.get(`/api/products?category=${category}`)
    dispatch({type:FETCH_PIZZAS_SUCCESS,payload:data})
  }
  catch(e){
    dispatch({type:ERROR,payload:'Opps!,something went wrong'}) 
  }
  
  
}