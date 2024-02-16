import React from 'react'
import './myStyles.css'
import { useNavigate } from 'react-router-dom'
import { setSelectedChat } from '../redux/chatSlice';
import { useDispatch, useSelector } from 'react-redux';


function ConversationItem({props}) {
  const navigate=useNavigate();
  const dispatch=useDispatch();

   

  const handleNavigation=(user)=>{
    console.log(user);
    dispatch(setSelectedChat(user));

    navigate(`chat/${props._id}`)

    
  }



  
  return (
    <div className='conversation-container' onClick={()=>handleNavigation(props)} >
    
    {props.chatName === "sender" ? (
      <>
        <p className='con-icon'>{props?.users[1]?.name.charAt(0)}</p>
         <p className='con-title'>{props?.users[1]?.name}</p>
           <p className='con-latestMessage'>{props?.lastestMessage?.content}</p>
        <p className='con-timeStamp'>{props.timeStamp}</p>
         </>
      ) : (
        <>
        <p className='con-icon'>{props.chatName.charAt(0)}</p>
        <p className='con-title'>{props?.chatName}</p>
        <p className='con-latestMessage'>{props.lastestMessage}</p>
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