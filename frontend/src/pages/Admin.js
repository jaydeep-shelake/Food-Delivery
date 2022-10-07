import React, { useEffect ,useState } from 'react'
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { collection,onSnapshot} from "firebase/firestore";
import { doc, updateDoc} from "firebase/firestore";
import { db,firestore } from '../firebase';
import {IoMdAdd,IoMdRemove} from 'react-icons/io'
import '../styles/admin.css'
import LeftSide from '../components/LeftSide';
const Admin = () => {
   let [data,setData]=useState([])
    useEffect(()=>{
      getData()
    },[])
    const getData=async()=>{
      onSnapshot(collection(firestore,db.pizzas),(snapshot)=>{
          const allData=[]
          snapshot.forEach(doc=>allData.push(doc.data()))
           setData(allData)
        });
     
      }

      

      const increaseQty=(item)=>{
        const ref = doc(firestore,db.pizzas,item.name);
       
        updateDoc(ref, {
          inStockItem: item.inStockItem+1
         })
         .then(()=>console.log("updated"))
      }
      const decreaseQty=(item)=>{
        const ref = doc(firestore,db.pizzas,item.name);
      if(item.inStockItem>=0){

        updateDoc(ref, {
          inStockItem: item.inStockItem-1
         })
         .then(()=>console.log("updated"))
      }
      }
    
  return (
    <> 
     <SideBar/>   
    <div className='mainarea'>
    <Header/>
    <div className="admin-items">
        <div className="admin-item">
            <p>Image</p>
            <p>Name</p>
            <p>Stock</p>
            <p>Count</p>
        </div>
     {
        data.map((item)=>(
         <div  className='admin-item' key={item.name}>
            <img src={item.img} alt="" />
           <p>{item.name}</p>
            <p>{!item.outOfStock?"In Stock":"Out of Stock"}</p>
            <div className='handleBtn'>
            <div className='btn' onClick={()=>decreaseQty(item)}><IoMdRemove/></div>
            <p>{item.inStockItem}</p>
            <div className='btn' onClick={()=>increaseQty(item)}><IoMdAdd/></div>

            </div>
         </div>
        ))
     }
    </div>
    </div>
    <LeftSide data={data}/>
    </>

  )
}

export default Admin