import React from 'react'
import '../styles/msg.css'
const Message = ({img,msg,showModal,type,closeModal}) => {
    return (
        <div className={`black-scree ${showModal&&'show'}`}>
            <div className='message-box'>
              <img src={img} alt="" />
              <p className={type}>{msg}</p>
              <button onClick={()=>closeModal(false)}>Ok</button>
            </div>
        </div>
        
    )
}

export default Message
