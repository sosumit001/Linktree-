import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/auth"
import Button from "../../designs/Button"

const ListItem = ({directTo,val,OnClick}) => {
    return (
        <li style = {{width:'50%',marginLeft:'-25%'}}>
            <Link onClick={OnClick} target={(val === 'Preview'?'_blank':'_self')} style={{padding:'5px'}} to={directTo} >{val}</Link>
        </li>
    )
}
const LeftHeader = ({Scale,OnClick}) => {

    const {user, logout} = useContext(AuthContext)

    const leftHeaderStyle = {
        display:'flex',
        alignItems:'center',
        width:'250px',
        height:'100vh',
        left:(Scale === 0)?'100%':'calc(100% - 228px)',
        top:'0px',
        position:'absolute',
        // opacity:`${Scale}`,
        cursor:'default',
        zIndex:'7000',
        transition:'400ms'
    }
    const listStyle = {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        backgroundColor:'rgb(0,0,30)',
        width:'80%',
        height:'100%',
    }

    const handleLogout = (event) => {
        event.preventDefault()
        logout()
        window.open('/','_self')
    }

    return (
        <div style={leftHeaderStyle}>
          <ul style={listStyle}>
            <ListItem OnClick = {OnClick} directTo={'/'} val = {'Home'} />
            <ListItem OnClick = {OnClick} directTo={'Edit'} val = {'Edit'} />
            <ListItem directTo={user.username} val = 'Preview' />
            {/* <li onClick={handleLogout} style = {{display:'flex',alignItems:'center',justifyContent:'center', height:'40px',width:'fit-content','backgroundColor':'green',marginLeft:'-25%'}}>
              <Link style={{backgroundColor:'red',width:'fit-content',padding:'10px'}}>logOut</Link>
            </li> */}
            <Button
            Width = {'70%'}
            Text = {'LogOut'}
            OnClick={handleLogout} 
            MarginLeft = {'-5%'}
            Color={'grey'}
            />
          </ul>

        </div>
    )
}

export default LeftHeader