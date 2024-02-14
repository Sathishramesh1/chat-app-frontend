import React, { useEffect } from 'react'
import './myStyles.css'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import MessagefromSelf from './MessagefromSelf';
import MessagetoOthers from './MessagetoOthers';
import { createChat } from '../Services/apiServices';

function ChatArea() {
  const dummy={
    name:"hello",
      lastMessage:"hi1",
      timeStamp:"today"

  }



  useEffect(()=>{
    const fetchChat=async()=>{
      try {
        const token=JSON.parse(localStorage.getItem('token'));
        const data=await createChat('65b0b38198282806c9515468',token);
        console.log(data);
        console.log(token);
      } catch (error) {
        console.log(error)
      }
    }
    fetchChat();
  },[])
  return (
    <div className='chatarea-container'>
        <div className='chatheader-container'>
          <p className='con-icon'>{dummy.name[0]}</p>
          <div className='header-text'>
            <p className='con-title'>{dummy.name}</p>
            <p className='con-timeStamp'>{dummy.timeStamp}</p>
          </div>
          <IconButton>
            <DeleteIcon/>
          </IconButton>
        </div>
        <div className='message-container'>
          <MessagefromSelf/>
          <MessagetoOthers/>
          <MessagefromSelf/>
          <MessagetoOthers/>
          <MessagefromSelf/>
          <MessagetoOthers/>
        </div>
        <div className='input-container'>
        <input type='text' placeholder='Type a Message' className='searchbox'/>
        <IconButton>
          <SendIcon/>
        </IconButton>
        </div>
    </div>
  )
}

export default ChatArea