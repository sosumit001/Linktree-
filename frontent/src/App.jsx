import './App.css'
import { useContext } from 'react'
import { AuthContext } from './context/auth'
import RoundSpin from './pageAttributes/RoundSpin'


//designs 
import Button from './designs/Button'
import SlideEffect from './build/buildComponent/SlideEffect'
import FileCard from './designs/FileCard'



function App() {

  const {user} = useContext(AuthContext)


  const handlebuildingBtn = () => {
    window.location.href = '/signup'
  }
  const handleWorkSpaceBtn = () => {
    window.location.href = '/edit'
  }

  const handleScroll = (e) => {

  };

  




  return (
    <div  className="app">
      {
      user?(
      <div id='appWrapper'>
        <div className='page-second' style={{backgroundColor:'whitesmoke'}} >
           <div>
           <div className="home-icon-1">
           <div style={{color:'rgb(158, 158, 158)'}}>Build your linktree</div>
           </div>
           <Button
            Width = {'30%'}
            Text = {'Workspace'}
            OnClick={handleWorkSpaceBtn} 
            MarginLeft = {'35%'}
            />
           {/* <button onClick={handlebuildingBtn}  >start building</button> */}
           </div>
        </div>

        <div className="home-page-3">
          <SlideEffect />
        </div>
      </div>
      ):(
        <div onScroll={handleScroll} id = "appWrapper">
        
        <div className='page-second' >
           <div>
           <div className="home-icon-1">
           <div>Your Links <span>Your Ways</span> </div>
           {/* <span>create your own personalized page and add your website, blog, social media accounts, and any other relevant links that you want to share with your audience</span> */}
           </div>
           <Button
            Width = {'40%'}
            Text = {'start building'}
            OnClick={handlebuildingBtn} 
            MarginLeft = {'30%'}
            />
           {/* <button onClick={handlebuildingBtn}  >start building</button> */}
           </div>
        </div>

        <div className="home-page-3">
          <FileCard />
          <SlideEffect />
        </div>

        <div className="home-page-4">
          <div className="page-4-heading">
          Analytics
          </div>
        </div>
        </div>
        
      )
      }
    </div>
  )
}


export default App
