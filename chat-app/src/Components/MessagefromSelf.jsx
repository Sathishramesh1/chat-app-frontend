import React from 'react'
import './myStyles.css'

function MessagefromSelf({content}) {

  

  return (
    <div className='message-self'>
    <span>{content}</span>
</div>
  )
}

export default MessagefromSelf