import React from 'react';
import Shimmer from '../Shimmer';
import SkeletonElement from './SkeletonElement';

const OrderDetail = () => {
  return (
      <div className='skeleton-wrapper light'>
    <div style={{width:'60%'}}>     
        <SkeletonElement type="title"/>
       <SkeletonElement type="text"/>
        <SkeletonElement type="title"style={{margin:'60px 0'}}/>
       <SkeletonElement type="text"/>
 <div className="skeleton-article" style={{margin:'60px 0'}}>
   <SkeletonElement type="title"/>
   <SkeletonElement type="text"/>
   <SkeletonElement type="text"/>
 </div>
 <div className="skeleton-article" style={{margin:'60px 0'}}>
   <SkeletonElement type="title"/>
   <SkeletonElement type="text"/>
   <SkeletonElement type="text"/>
 </div>
 <div className="skeleton-article" style={{margin:'60px 0'}}>
   <SkeletonElement type="title"/>
   <SkeletonElement type="text"/>

 </div>
 </div>

 <div className="price-details" style={{width:'35%'}}>
 <div className="skeleton-article">
   <SkeletonElement type="title"/>
   <SkeletonElement type="text"/>
   <SkeletonElement type="text"/>
 </div> 
 </div>
 <Shimmer/>
      </div>
  );
};

export default OrderDetail;
