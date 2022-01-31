import React, { useState } from 'react'
import {FiSearch} from 'react-icons/fi'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { searchProducts } from '../actions'
import Spinner from './Spinner'
const Header = () => {
    const [name,setName]=useState('')
     const navigate=useNavigate()
    const search=useSelector(state=>state.search)
    const dispatch =useDispatch()
    const handleSearch=(e)=>{
        e.preventDefault()
     dispatch(searchProducts(name))
     navigate(`/search?=${name}`)

    }
    return (
        <div className='header'>
           <div className="logo">
              <img src="https://cdn-icons-png.flaticon.com/512/4039/4039232.png" alt="logo" />
            </div>
            <form onSubmit={handleSearch} className="search-bar">
                <div className="input">
                <input onChange={(e)=>setName(e.target.value)} type="text" placeholder='Search For Food' /> 
                {search?.loading?(<div>
                  <Spinner/>
                </div>):<FiSearch onClick={handleSearch}/>}
                </div>
            </form>  
        </div>
    )
}

export default Header
