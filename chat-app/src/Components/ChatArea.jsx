import React from 'react'
import './myStyles.css'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import MessagefromSelf from './MessagefromSelf';
import MessagetoOthers from './MessagetoOthers';

function ChatArea({props}) {
  return (
    <div className='chatarea-container'>
        <div className='chatheader-container'>
          <p className='con-icon'>{props.name[0]}</p>
          <div className='header-text'>
            <p className='con-title'>{props.name}</p>
            <p className='con-timeStamp'>{props.timeStamp}</p>
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