import React, { useEffect, useState } from 'react'
import './myStyles.css'
import SideBar from './SideBar'
import WorkArea from './WorkArea'
import ChatArea from './ChatArea'
import Welcome from './Welcome'
import CreateGroup from './CreateGroup'
import UserGroups from './UserGroups'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIsSmallScreen,setShowChatArea } from '../redux/chatSlice'

function MainContainer() {
 
      
  // const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768); 
  
  // const [showChatArea, setShowChatArea] = useState(false); // State to manage chat area visibility

  // Function to toggle chat area visibility
  // const toggleChatArea = () => {
  //   setShowChatArea(!showChatArea);
  // };
  const dispatch = useDispatch();
  const isSmallScreen = useSelector(state => state.chat.isSmallScreen);
  const showChatArea = useSelector(state => state.chat.showChatArea);


  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsSmallScreen(window.innerWidth < 768)); 
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

   
  return (
    <div className='main-container'>
        
        {isSmallScreen&& !showChatArea&&<SideBar />}
        {isSmallScreen&&showChatArea&&<Outlet/>}

        {!isSmallScreen && <SideBar />} 
      {!isSmallScreen && <Outlet />} 
        {/* <SideBar/> */}
        
        {/* <Outlet/> */}
        {/* <UserGroups/> */}
       {/* <CreateGroup/> */}
        
        {/* <ChatArea props={dummy}/> */}
    </div>
  )
}

export default MainContainer