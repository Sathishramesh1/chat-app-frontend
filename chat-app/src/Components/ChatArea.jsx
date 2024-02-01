import React from 'react'
import './myStyles.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

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
        <div className='message-container'>message conatiner</div>
        <div className='input-container'>input box</div>
    </div>
  )
}

export default ChatArea