import React ,{useState,useEffect} from 'react'
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { useSelector,useDispatch } from 'react-redux';
import { deleteAddress } from '../actions/address';
import {RiAddFill} from 'react-icons/ri'
import { getAdress } from '../actions/address';
import AddressModal from '../components/AddressModal';
import LeftSide from '../components/LeftSide';
const Address = () => {
    const allAdress = useSelector(state=>state.address.addressItems)
    const user = useSelector(state=>state.user.user)
   const [addressToEdit,setAddressToEdit]=useState()
   const [show,setShow]=useState(false)
    const dispatch =useDispatch()
    const delteAddress=(id)=>{
        dispatch(deleteAddress(id))
    }
    const handleUpdateAddress=(address)=>{
       setAddressToEdit(address)
       setShow(true)
    }
    useEffect(()=>{
        if(user){
            dispatch(getAdress(user._id))
        }
    },[])
  return (
    <>
    <SideBar/>
    <div className='mainarea'>
    <Header/>
    <div className="address">
        <h3>Your addresAddress</h3>
        <div className="add-sec-area">
            {
            allAdress.length>0?(allAdress.map((address,i)=>(
                <div  className={`og-add `} key={address._id}>
                <p>{address.name}</p>
                <span>{address.address},{address.town}</span>
                <span>{address.city},{address.state} -{address.pinCode} </span>
                <span><b>Mobile No:</b>{address.mobNo}</span>
                <div className="btns">
                    <button className='btn' onClick={()=>delteAddress(address._id)}>Remove</button>
                    <button className='btn' onClick={()=>handleUpdateAddress(address)}>Edit</button>
                </div>
               </div>
            ))
            ):<h3 style={{padding:'20px 0'}}>No Address found! Add one</h3>}
           
            <div className="add-address" onClick={()=>setShow(true)}>
             <div className="add">
                 <RiAddFill/>
                 <p>Add Address</p>
             </div>
            </div>
        </div>
       </div>
    </div>
    <LeftSide/>
    <AddressModal show={show} setShow={setShow} addressToEdit={addressToEdit}/>
    </>
  )
}

export default Address