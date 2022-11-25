import pizza from "../apis/pizza"
import { CREATE_ORDER, CREATE_ORDER_ERROR, CREATE_ORDER_REQUEST, DELETE_CART, ORDER_DETAIlS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQURST, PAYMENT_METHOD } from "./types"
import { doc, updateDoc ,getDoc} from "firebase/firestore";
import {firestore,db} from '../firebase'

export const selectPayment =(payment)=>async dispatch=>{
   dispatch({type:PAYMENT_METHOD,payload:payment})
}

export const placeOrder=(order)=> async (dispatch,getState)=>{
      dispatch({type:CREATE_ORDER_REQUEST,payload:order})
      console.log(order)
   try {
      const user = getState().user?.user;
      const {data} =await pizza.post('/api/orders',order,{
         headers:{
            Authorization: `Bearer ${user.token}`
         }
      })
     
      console.log("data","=>",data?.order.orderItems)
      data?.order.orderItems?.map((item)=>{
         console.log("exicution")
         const docRef = doc(firestore, db.pizzas,item.name);
        getDoc(docRef).then((docSnap)=>{
           console.log(docSnap.data())
         const inStockItem= docSnap.data().inStockItem
          const ref = doc(firestore,db.pizzas,item.name);
          updateDoc(ref, {
            inStockItem: inStockItem-item.qty
           }).then(()=>console.log("added sucessfully"));
        });
        
      })
      dispatch({type:CREATE_ORDER,payload:data.order})
      dispatch({type:DELETE_CART})
      localStorage.removeItem('cartItems');
   } catch (error) {
      dispatch({type:CREATE_ORDER_ERROR,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
   }
}

export const getOrderDetails=(id)=>async (dispatch,getState)=>{
   dispatch({type:ORDER_DETAILS_REQURST})
   try {
      const user = getState().user?.user;
      const {data}=await pizza.get(`/api/orders/${id}`,{
         headers:{
            Authorization: `Bearer ${user.token}` 
         }
      })
      console.log(data)
      dispatch({type:ORDER_DETAIlS,payload:data})
   } catch (error) {
      dispatch({type:ORDER_DETAILS_FAIL,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
   }
}