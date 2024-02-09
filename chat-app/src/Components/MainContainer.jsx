import React from 'react'
import './myStyles.css'
import SideBar from './SideBar'
import WorkArea from './WorkArea'
import ChatArea from './ChatArea'
import Welcome from './Welcome'
import CreateGroup from './CreateGroup'
import UserGroups from './UserGroups'
import { Outlet } from 'react-router-dom'

function MainContainer() {
 
  return (
    <div className='main-container'>
        <SideBar/>
        <Outlet/>
        {/* <UserGroups/> */}
       {/* <CreateGroup/> */}
        
        {/* <ChatArea props={dummy}/> */}
    </div>
  )
}

export default MainContainer