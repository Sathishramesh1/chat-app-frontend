import React, { useEffect, useRef, useState } from 'react'
import './myStyles.css'
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MessagefromSelf from './MessagefromSelf';
import MessagetoOthers from './MessagetoOthers';
import { addNewUser, createChat, getChat, sendMessage } from '../Services/apiServices';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { setAllMessages, setEmpty, setSelectedChat, setSingleMessage,setShowChatArea,setNewMessage, setAddUsertoGroup, toggleRemoveUser, toggleGroupName } from '../redux/chatSlice';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import UserGroups from './UserGroups';
import AddUser from './AddUser';
import RemoveUser from './RemoveUser';
import RenameGroup from './RenameGroup';
import { socket } from './MainContainer';


function ChatArea() {

  const dispatch = useDispatch();
  const {allMessages,addUserToGroup}=useSelector((state)=>state.chat);
  const {selectedChat,showChatArea}=useSelector((state)=>state.chat);
  const token=JSON.parse(localStorage.getItem('token'));
  const id=JSON.parse(localStorage.getItem('user'));
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);      

  const {chatId}=useParams();
  const [message,setMessage]=useState({content:''});
  


  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  // console.log(chatId)
  const dummy={
    name:"hello",
      lastMessage:"hi1",
      timeStamp:"today"

  }
 

const handleSend=async()=>{
  try {

    if (!message.content.trim()) {
      
      console.log("no message")
      return;
    }
    // console.log(token)
    let resetCopy={...message}
    
    console.log(message)
    let msg={...resetCopy,_id:chatId,sender:{_id:id}}
    
    dispatch(setSingleMessage(msg));
    
    scrollToBottom(); 
   
    socket.emit("new message",msg)
    setMessage({content:''});
  
    
    const data=await sendMessage({...resetCopy,chatId:chatId},token);
    console.log(data)
  
    
    
    
  } catch (error) {
    console.log(error)
    
  }
}

  useEffect(()=>{
    const fetchChat=async()=>{
      try {
        const token=JSON.parse(localStorage.getItem('token'));
        dispatch(setEmpty());
        const data=await getChat(chatId,token);
        console.log(data);
       
        dispatch(setAllMessages(data.data));
        dispatch(setSelectedChat(data.data[0].chat));
        
        // console.log([...allMessages])
        socket.emit("setup", { data: { id: id } }); 
       
      } catch (error) {
        console.log(error)
      }
    }
    fetchChat();
    
    return ()=>{
      dispatch(setEmpty());
    }
    
  },[chatId]);
  useEffect(() => {
    socket.emit("join chat", chatId);

    socket.on("message received", (msg) => {
      console.log(msg,"checking")
      dispatch(setNewMessage(msg));
      dispatch(setSingleMessage(msg));
    
    });
   

    return () => {
      socket.off("message received"); // Cleanup event 
    };
  }, [chatId]);

  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  };


  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
      socket.emit("typing", { chatId, isTyping: false }); // Emit typing status
    }, 1000); // Change this delay as needed
    return () => clearTimeout(typingTimeout);
  }, [message.content]);

  const handleTyping = () => {
    setIsTyping(true);
    socket.emit("typing", { chatId, isTyping: true }); // Emit typing status
  };

  
//scroll to bottom to see last message
  useEffect(() => {
    
     scrollToBottom(); 
     console.log(selectedChat)
  }, [allMessages]);


  const handleAddUser=()=>{

    dispatch(setAddUsertoGroup());
    handleClose();

  }

  const handleRemoveUser=()=>{
   
    dispatch(toggleRemoveUser());
    handleClose();

  }
  
  const handleGroupNameChange=()=>{
   
    dispatch(toggleGroupName());
    handleClose();

  }


  return (
    <div className='chatarea-container'>
    
        <div className='chatheader-container'>

        {showChatArea&&<IconButton onClick={()=>dispatch(setShowChatArea(false))}>
            <KeyboardBackspaceIcon/>
            
          </IconButton>}
        
          <p className='con-icon'>{!selectedChat?.isGroupChat &&<img />}</p>
        
          <div className='header-text'>
            <p className='con-title '>{selectedChat.chatName!=='sender'?
            (selectedChat?.chatName): 
             (selectedChat &&selectedChat.users?.length>0&&selectedChat?.users[1]?.name)}</p>
            <p className='con-timeStamp'>{dummy.timeStamp}</p>
          </div>
          <IconButton onClick={handleClick}>
          
            <MoreHorizIcon/>
          </IconButton>
          <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          
          <MenuItem onClick={handleAddUser}>Add a User</MenuItem>
          <MenuItem onClick={handleRemoveUser}>Remove User</MenuItem>
          <MenuItem onClick={handleGroupNameChange}>Change Group Name</MenuItem>
        </Menu>
        </div>
        <div className='message-container' >
         {allMessages.length>0&&[...allMessages].map((ele)=>(  
         
          <div ref={messagesEndRef}  key={ele?._id}>
          
          {ele.sender._id===id?(<MessagefromSelf content={ele} key={ele?._id}/>)
         :
         (<MessagetoOthers content={ele}  key={ele?._id}/>)}
         </div>
          
         ))}
        </div>
        <div className='input-container'>
        <input type='text' placeholder='Type a Message' className='searchbox'
          value={message.content}
          onChange={(e) => {
          setMessage(prev => ({
            ...prev,
            content: e.target.value
          }));
        }}
  onKeyDown={() => {
        handleTyping();
    }}
        />
        <IconButton onClick={()=>handleSend()}
        
        >
          <SendIcon/>
        </IconButton>
        </div>
       <AddUser/>
       <RemoveUser/>
       <RenameGroup/>
    </div>
  )
}

export default ChatArea