import React, { useState } from 'react'
import './myStyles.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ConversationItem from './Conversation';



function SideBar() {

  const [Conversation, setConversation] = useState([
    {
      name:"test1",
      lastMessage:"hi1",
      timeStamp:"today"
    },
    {
      name:"test2",
      lastMessage:"hi22",
      timeStamp:"today"
    },
    {
      name:"test3",
      lastMessage:"hi3",
      timeStamp:"today3"
    },

  ])

  return (
    <div className='sidebar-container'>


   <div className='sb-header'>
   <div>
   <IconButton>
   <AccountCircleIcon/>
   </IconButton>
   </div>
   <div>
   <IconButton>
   <PersonAddAlt1Icon/>
   </IconButton>
   <IconButton>
   <GroupAddIcon/>
   </IconButton>
   <IconButton>
   <AddCircleIcon/>
   </IconButton>
   <IconButton>
   <NightlightIcon/>
   </IconButton>
   </div>
   </div>
   <div className='sb-searchBar'>
   <IconButton>
    <SearchIcon/>
    </IconButton>
    <input type='text' placeholder='search' className='searchbox'/>
    
   </div>
   <div className='sb-conversations'>
   {Conversation.map((ele)=>{
    return <ConversationItem props={ele}/>
   })}
   
   </div>

    </div>
  )
}

export default SideBar