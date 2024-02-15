import React, { useEffect, useState } from 'react'
import './myStyles.css'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import MessagefromSelf from './MessagefromSelf';
import MessagetoOthers from './MessagetoOthers';
import { createChat, getChat, sendMessage } from '../Services/apiServices';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";


const socket = io("https://chat-app-v1rl.onrender.com");

function ChatArea() {
  
  const token=JSON.parse(localStorage.getItem('token'));
  const {chatId}=useParams();
  const [message,setMessage]=useState({content:''});
 
  // console.log(chatId)
  const dummy={
    name:"hello",
      lastMessage:"hi1",
      timeStamp:"today"

  }
  socket.on("message received",(md)=>{
    console.log(md);
  })

const handleSend=async()=>{
  try {
    console.log(token)
    let msg={...message,_id:chatId}
    socket.emit("new message",msg)
    const data=await sendMessage({...message,chatId:chatId},token);
    
    // console.log(data)
  } catch (error) {
    console.log(error)
    
  }
}

  useEffect(()=>{
    const fetchChat=async()=>{
      try {
        const token=JSON.parse(localStorage.getItem('token'));
        
        const data=await getChat(chatId,token);
        // console.log(data);
        // console.log(token);
      } catch (error) {
        console.log(error)
      }
    }
    fetchChat();
    console.log(message)
    
  },[chatId,token]);
  useEffect(() => {
    socket.emit("join chat", chatId);

    socket.on("message received", (msg) => {
      console.log(msg);
      // Handle received message here if needed
    });

    return () => {
      socket.off("message received"); // Cleanup event listener
    };
  }, [chatId]);

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
        <input type='text' placeholder='Type a Message' className='searchbox'
          value={message.content}
          onChange={(e)=>setMessage({ content: e.target.value })}
        />
        <IconButton onClick={handleSend}>
          <SendIcon/>
        </IconButton>
        </div>
    </div>
  )
}

export default ChatArea