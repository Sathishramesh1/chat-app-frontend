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
import { setsearchUsers } from '../redux/chatSlice';
import { setMyChats } from '../redux/chatSlice';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Pill from './Pill';



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
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 
 const handleSuggestion=(ele)=>{

  setSelected([...selected, ele]);
  // Clear suggestion list after selecting a user
  setSuggestion([]);

 } 


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
   
   <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            
            
            handleClose();
          },
        }}
      ><DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Create a New Group
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Group Name"
            type="text"
            fullWidth
            variant="standard"
            value={groupUser.name}
            onChange={(e) => setGroupUser({ ...groupUser, [e.target.name]: e.target.value})}
          />
          
          {/* <TextField
            autoFocus
            required
            margin="dense"
            id="user"
            name="userName"
            label="Users"
            type="text"
            fullWidth
            variant="standard"
            value={groupUser.userName}
            onChange={(e) => setGroupUser({ ...groupUser, [e.target.name]: e.target.value })}  
            InputProps={{
        startAdornment: (
            <span className="start-adornment">{selected.length>0&&selected.map((ele)=>{
             return <Pill  name={ele.name}/>
            })} </span>
        ),
    }}         
          /> */}
           <ul className='suggestion-list'>
   
   {suggestion.length>0&&suggestion?.map((ele)=> (
   
     <li key={ele._id}  onClick={()=>handleSuggestion(ele)}>{ele.name}</li>
   ))}
 </ul>
        </DialogContent>
      
       
        <DialogActions>
       
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>


    </div>
  )
}

export default SideBar