import React from 'react'
import '../styles/skeleton.css';
const SkeletonElement = ({type}) => {
    return (
        <div className={`skeleton ${type}`}>
            
        </div>
    )
}

export default SkeletonElement