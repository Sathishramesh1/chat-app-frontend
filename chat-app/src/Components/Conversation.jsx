import React from 'react'
import './myStyles.css'
import { useNavigate } from 'react-router-dom'
import { setSelectedChat } from '../redux/chatSlice';
import { useDispatch } from 'react-redux';

function ConversationItem({props}) {
  const navigate=useNavigate();
  const dispatch=useDispatch();



  const handleNavigation=()=>{

    navigate(`chat/${props._id}`)

    
  }



  
  return (
    <div className='conversation-container' onClick={handleNavigation} >
    
    {props.chatName === "sender" ? (
      <>
        <p className='con-icon'>{props?.users[1]?.name.charAt(0)}</p>
         <p className='con-title'>{props?.users[1]?.name}</p>
           <p className='con-latestMessage'>{props.lastMessage}</p>
        <p className='con-timeStamp'>{props.timeStamp}</p>
         </>
      ) : (
        <>
        <p className='con-icon'>{props.chatName.charAt(0)}</p>
        <p className='con-title'>{props?.chatName}</p>
        <p className='con-latestMessage'>{props.lastMessage}</p>
        <p className='con-timeStamp'>{props.timeStamp}</p>
        </>
      )}
     
        
        {/* <p className='con-title'>{props?.users[1].name}</p> */}
        {/* <p className='con-latestMessage'>{props.lastMessage}</p>
        <p className='con-timeStamp'>{props.timeStamp}</p> */}
    </div>
  )
}

export default ConversationItem