import React ,{useState}from 'react'
import '../styles/sidebar.css'
import {FaHome,FaBoxOpen,FaWallet} from 'react-icons/fa'
import {BsHeartHalf,BsGear} from 'react-icons/bs'
import {CgFileDocument} from 'react-icons/cg'
import { Link,useLocation } from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/auth'
const SideBar = () => {
       const dispatch =useDispatch()
       const user = useSelector(state=>state.user.user)
       const [show,setShow]=useState(false)

       const location =useLocation()
       const path =location.pathname

    const handleSignOut =()=>{
          dispatch(logout())
    }
    return (
        <div className={`sidebar ${show&&'full'}`} onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)} >
            <div className="top-icons">
            <Link to="/"><div className={`icon ${path==='/'&&'active'}`}>
                <FaHome/>
            </div></Link>
            <Link to="/orders"><div className={`icon ${path==='/orders'&&'active'}`}>
                <FaBoxOpen/>
            </div></Link>
            <div className="icon">
                <BsHeartHalf/>
            </div>
            <div className="icon">
                <CgFileDocument/>
            </div>
            <div className="icon">
                <FaWallet/>
            </div>
            <Link to='/profile'><div className={`icon ${path==='/profile'&&'active'}`}>
                <BsGear/>
            </div></Link>
            </div>
            <div className="bottom-icon">
            {user&&(<div className="icon" onClick={handleSignOut}>
            <FiLogOut/>
            </div>)}
            </div>
        </div>
    )
}

export default SideBar
