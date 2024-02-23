import React, { useEffect, useState } from 'react'
import './myStyles.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import {  Button, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ConversationItem from './Conversation';
import { useDispatch, useSelector } from 'react-redux';
import { createChat, getAllChat, searchUserApi } from '../Services/apiServices';
import { openCreateGroup, setsearchUsers } from '../redux/chatSlice';
import { setMyChats } from '../redux/chatSlice';
import { useNavigate } from 'react-router-dom';
import Pill from './Pill';
import UserGroups from './UserGroups';



function SideBar() {

const {myChats}=useSelector((state)=>state.chat);
const token=JSON.parse(localStorage.getItem('token'));
const searchUsers=useSelector((state)=>state.chat.searchUsers)
const navigate=useNavigate();
const [user,setUser]=useState(null);
const [groupUser,setGroupUser]=useState({name:'',userName:''});
const [suggestion,setSuggestion]=useState([]);
const [selected,setSelected]=useState([]);

const dispatch=useDispatch();



  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    dispatch(openCreateGroup());
  };

  const handleClose = () => {
    setOpen(false);
  };

 
 


  const handleCreation=async(userId)=>{
    try {

       const data=await createChat(userId,token);
      console.log(data)
       if(data.status==200){
        
        navigate(`chat/${data.data._id}`)
       }
    } catch (error) {
      console.log(error)
      
    }
  }


  useEffect(()=>{
   
    const fetchData=async()=>{
      try {
        
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

    const fetchChat=async()=>{
      try {
        const data=await getAllChat(token);
        dispatch(setMyChats(data.data))
        
      } catch (error) {
        console.log(error);
        
      }
    }
   fetchChat();

  },[user]);


  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && !user) {
      // Dispatch an action to clear the search results
      dispatch(setsearchUsers([]));
    }
  };

useEffect(()=>{
  const fetchData=async()=>{
    try {
      
      const data=await searchUserApi(groupUser.userName,token);
      console.log(data.data);
      console.log("searching")
        setSuggestion([...data.data])
      
    } catch (error) {
      console.log(error);
    }
  }
  
  if(groupUser.userName){
    fetchData();
  }

},[groupUser.userName])  
  
  
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
   <IconButton onClick={handleClickOpen}>
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
      onKeyDown={handleKeyDown}
    />
    
   </div>
   <div>    <ul className='suggestion-list'>
   
      {searchUsers.length>0&&searchUsers?.map((ele)=> (
        <li key={ele._id}  onClick={()=>handleCreation(ele._id)}>{ele.name}</li>
      ))}
    </ul>
    </div>
   <div className='sb-conversations'>
   {myChats.map((ele,i)=>{
    
    return <ConversationItem props={ele} key={ele._id}  />
   })}
   </div>
   
  <UserGroups/>
   

    </div>
  )
}

export default SideBar