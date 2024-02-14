import React, { useEffect, useState } from 'react'
import './myStyles.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ConversationItem from './Conversation';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserApi } from '../Services/apiServices';
import { setsearchUsers } from '../redux/chatSlice';


function SideBar() {


const searchUsers=useSelector((state)=>state.chat.searchUsers)
const [user,setUser]=useState(null);
const dispatch=useDispatch();
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



  useEffect(()=>{
   
    const fetchData=async()=>{
      try {
        console.log(user)
        const token=JSON.parse(localStorage.getItem('token'));
        console.log(token)
        const data=await searchUserApi(user,token);
        console.log(data.data);
        console.log(searchUsers)
          dispatch(setsearchUsers(data.data))
          console.log(searchUsers)
        
      } catch (error) {
        console.log(error);
      }
    }
    if(user){
      fetchData();
    }

  },[user])
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
    <input type='text' placeholder='search' className='searchbox'

      onChange={(e)=>setUser(e.target.value)}
    />
    
   </div>
   <div>    <ul className='suggestion-list'>
      {searchUsers?.map((ele)=> <li key={ele._id} >{ele.name}</li>
      )}
    </ul>
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