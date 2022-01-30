import React from 'react'
import {FiSearch} from 'react-icons/fi'
const Header = () => {
    return (
        <div className='header'>
           <div className="logo">
              <img src="https://cdn-icons-png.flaticon.com/512/4039/4039232.png" alt="logo" />
            </div>
            <div className="search-bar">
                <div className="input">
                <input type="text" placeholder='Search For Food' /> 
                <FiSearch/>
                </div>
            </div>  
        </div>
    )
}

export default Header
