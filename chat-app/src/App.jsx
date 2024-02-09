

import { Route, Routes } from 'react-router-dom';
import './App.css'
import MainContainer from './Components/MainContainer';
import SignIn from './Pages/Login';
import Welcome from './Components/Welcome';
import ChatArea from './Components/ChatArea';
import CreateGroup from './Components/CreateGroup';

function App() {
 

  return (
    <>
    <div className='App' >
  
    {/* <MainContainer/> */}
    {/* <SignIn/> */}
    <Routes>

      <Route exact path='/' element={<SignIn/>}/>
      <Route path='app' element={<MainContainer/>}>
      <Route path='welcome' element={<Welcome/>}/>
      <Route path='chat' element={<ChatArea/>}/>
       <Route path='create-group' element={<CreateGroup/>}/>

      </Route>
    </Routes>
      
    </div>
  
   

    </>
  )
}

export default App
