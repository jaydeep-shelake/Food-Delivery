import React,{useEffect, useState} from 'react';
import '../styles/auth.css';
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner'
import { signupUser } from '../actions/auth';
const Signup = () => {
    const [isLoading,setLoading]=useState(false)
    const dispatch =useDispatch();
    const user= useSelector(state=>state.userRegister)
    const location =useLocation()
    const navigate = useNavigate()
    const userInfo= user?.user;
    const redirect= location.search ? `/${location.search.split('=')[1]}`:'/';
    console.log(redirect)
    //form validation
    let schema = yup.object().shape({
        name:yup.string().required("Please Enter your Name"),
        email:yup.string().required("Please Enter your Email").email(),
        password:yup.string().required("Please Enter your password")
        .test(
            "regex",
            "Password must be min 6 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase",
          val => {
            let regExp = new RegExp(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
            )
            return regExp.test(val);
       })   

    })
  

    const {register,handleSubmit,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
    })
// console.log(errors)
 
    const submitHandler=(data)=>{
        dispatch(signupUser(data.name,data.email,data.password))
        console.log(data.email,data.password)
        setLoading(true)
    }

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo])

    return (
        <div className='auth'>
            <div className="form">
                <div className="logo">
                    <img src="https://cdn-icons-png.flaticon.com/512/4039/4039232.png" alt="" />
                </div>
                {user?.error&&(<div className="err">
                 {user?.error}
                </div>)}
                <form onSubmit={handleSubmit(submitHandler)}>
                <input type="text" name='name' placeholder='Name' {...register('name', { required: true })} />
                    {errors?.name?.message&&<p className="err">{errors?.name?.message}</p>}
                    <input type="email" name='email' placeholder='Email' {...register('email', { required: true })} />
                    {errors?.email?.message&&<p className="err">{errors?.email?.message}</p>}
                    <input type="password" name="password" id="" placeholder='Password' {...register('password', { required: true })} />
                    {errors?.password?.message&&<p className="err">{errors?.password?.message}</p>}
                    <div className="text">
                      <Link to="/updatepassword">  <p>Forget Password?</p></Link>
                    </div>
                    <button type="submit">{user?.loading? <Spinner/>:'Register'}</button>
                </form>
                <div className="forget">
                 <p>Alreday a user?</p> <Link to="/signin">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
