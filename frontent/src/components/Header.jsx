import { Link } from 'react-router-dom'

import { useContext, useState } from 'react'
import { AuthContext } from '../context/auth'
import LeftHeader from './subComponents/LeftHeader'
import './Header.css'


export const Header = () => {
    
    const [isMenuOn, setMenu] = useState({
      on: false,
      scale: 0
    })

    const {user} = useContext(AuthContext)
    const handleMenuClick = () => {
      if(!isMenuOn.on) {
        setMenu({on: true, scale:1})
      } else {
        setMenu({on: false, scale:0})
      }
    }

    const menuBar = user? (
         <div id="Header">
          <div style={{gap:(isMenuOn.scale === 0)?'10%':'0%'}}  onClick={handleMenuClick} className='external-part-2' >
            <div style={{transform:(isMenuOn.scale === 0)?'rotate(0deg)':'rotate(45deg)'}} ></div>
            <div style={{width:(isMenuOn.scale === 0)?'40%':'0%'}}></div>
            <div style={{transform:(isMenuOn.scale === 0)?'rotate(0deg)':'rotate(-45deg)'}}></div>
          </div>
          <LeftHeader OnClick = {handleMenuClick} Scale = {isMenuOn.scale} />
         </div>
    ):(
        <div id="Header">
            <div className='Header-external-part-1' >
             
              <ul>
                <li><Link to='/'>HOME</Link></li>
                <li><Link target='blank' to='/about'>ABOUT</Link></li>
                <li><Link to='/signup'>SIGNUP</Link></li>
                <li><Link to='/login'>LOGIN</Link></li>
              </ul>
            </div>
    </div>
    )
    return menuBar
}


