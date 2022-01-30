import pizza from "../apis/pizza"
import { AUTH_ERROR, LOGOUT, SIGNIN, SIGNIN_REQUEST,SIGNUP,SIGNUP_REQUEST, UPADTE_PROFILE, UPDATE_PROFILE_ERROR, UPDATE_PROFILE_REQ } from "./types"

export const siginUser = (email,password)=>async(dispatch,getState)=>{
    dispatch({type:SIGNIN_REQUEST})
   try {
       const {data}=await pizza.post('/api/users/signin',{email,password})
       dispatch({type:SIGNIN,payload:data})
       localStorage.setItem('User',JSON.stringify(data))
   } catch (error) {
       dispatch({type:AUTH_ERROR,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
   }
}

export const signupUser =(name,email,password)=>async dispatch =>{
    dispatch({type:SIGNUP_REQUEST})
   try {
       const {data}=await pizza.post('/api/users/signup',{name,email,password})
       dispatch({type:SIGNUP,payload:data})
       dispatch({type:SIGNIN,payload:data})
       localStorage.setItem('User',JSON.stringify(data))
   } catch (error) {
       dispatch({type:AUTH_ERROR,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
   } 
}

export const updateprofile=(userInfo)=>async (dispatch,getState)=>{
    dispatch({type:UPDATE_PROFILE_REQ,payload:userInfo})
    try{
        const user = getState().user?.user;
      const {data} = await pizza.put('/api/users/updateProfile',userInfo,{
        headers:{
            Authorization: `Bearer ${user.token}`
         }
      })
      dispatch({type:UPADTE_PROFILE,payload:data})
      localStorage.setItem('User',JSON.stringify(data))
     console.log(data)
    }
    catch(error){
        dispatch({type:UPDATE_PROFILE_ERROR,payload:error.response&&error.response.data.message?error.response.data.message:error.message})
    }
}

export const logout=()=>async dispatch=>{
    localStorage.removeItem('User')
    dispatch({type:LOGOUT})
}