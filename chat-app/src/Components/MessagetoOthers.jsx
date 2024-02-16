import React from 'react'
import './myStyles.css'

function MessagetoOthers({content}) {
  return (
    <div className='message-other'>
    <span>{content}
    </span>
    </div>
  )
}

export default MessagetoOthers