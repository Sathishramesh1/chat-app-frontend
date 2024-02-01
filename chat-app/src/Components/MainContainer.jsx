import React from 'react'
import './myStyles.css'
import SideBar from './SideBar'
import WorkArea from './WorkArea'
import ChatArea from './ChatArea'

function MainContainer() {
  const dummy={
    name:"hello",
      lastMessage:"hi1",
      timeStamp:"today"

  }
  return (
    <div className='main-container'>
        <SideBar/>
        {/* <WorkArea/> */}
        <ChatArea props={dummy}/>
    </div>
  )
}

export default MainContainer