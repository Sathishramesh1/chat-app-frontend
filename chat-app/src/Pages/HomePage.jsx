import React from 'react'
import '../App.css'
import SideBar from '../Components/SideBar'

function HomePage() {



  return (

    <div className=' d-flex  '>
    
   <div id='sidebar' className='container  col col-sm-12 col-md-4 bg-primary'>
    <SideBar/>
   </div>
   <div id='chat' className='container col-md-9 d-none d-md-block '>
    chatPage
   </div>

    </div>
  )
}

export default HomePage