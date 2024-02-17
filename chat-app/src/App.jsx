

import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import MainContainer from './Components/MainContainer';
import SignIn from './Pages/Login';
import Welcome from './Components/Welcome';
import ChatArea from './Components/ChatArea';
import CreateGroup from './Components/CreateGroup';
import Register from './Pages/Register';
import { useSelector } from 'react-redux';

function App() {
 
  
const token=useSelector((state)=>state.chat.user.token);
// console.log(token)

  return (
    <>
    <div className='App' >
  
    
    <Routes>

      <Route exact path='/' element={<SignIn/>}/>
      <Route path='app' element={token?<MainContainer/>:<Navigate to='/' />}>
      <Route path='welcome' element={<Welcome/>}/>
      <Route path='chat/:chatId' element={<ChatArea/>}/>
       {/* <Route path='create-group' element={<CreateGroup/>}/> */}

      </Route>
      <Route path='/register' element={<Register/>
      }/>
    </Routes>
      
    </div>
  
   

    </>
  )
}

export default App
