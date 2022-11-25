import React,{useEffect, useState} from 'react';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import LeftSide from '../components/LeftSide';
import ProductCard from '../components/products/ProductCard';
import Message from '../components/Message';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SkeletonArticle from '../skeleton/SkeletonArticle';
import { searchProducts } from '../actions';
const Search = () => {
    const error = useSelector(state=>state.search?.error)
    const location = useLocation()
   const query = location.search.split('=')[1]
//    console.log(query)
    const [show,setShow]=useState(error?true:false)
    const data = useSelector(state=>state.search?.allPorducts)
    const loading = useSelector(state=>state.search?.loading)
    const dispatch =useDispatch()
    useEffect(()=>{
      dispatch(searchProducts(query))
    },[query])
  return (
      <>
      <SideBar/>
       <div className='mainarea  main-search'>
         <Header/>
         <h3>search result: {data?.length} for {query}</h3>
         <div className="all-list search">
         <div className='all-products'>
          {loading?(
          <>
            {[1,2,3,4,5,6].map(n=><div className='product-card' key={n}><SkeletonArticle key={n}/></div>)}
          </>
          ):<ProductCard product={data?data:[]}/>}
          <Message showModal={show}
          msg={"Opps!,Something went wrong"}
          img={"https://image.flaticon.com/icons/png/512/835/835408.png"}
          type="error"
          closeModal={setShow}
          />  
        </div>
            </div>
         </div>
         <LeftSide/>
      </>
  );
};

export default Search;
