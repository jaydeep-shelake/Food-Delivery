import React from 'react'
import SkeletonElement from './SkeletonElement';

const SkeletonProfile = ({theme}) => {
    return (
        <div className={`skeleton-wrapper ${theme?theme:'light'}`}>
            <div className="skeleton-profile">
                <div className="left">
                   <SkeletonElement type="avatar"/>
                </div>
                <div className="right">
                    <SkeletonElement type="title"/>
                   <SkeletonElement type="text"/>
                   <SkeletonElement type="text"/>
                </div>
            
            </div>
        </div>
    )
}

export default SkeletonProfile