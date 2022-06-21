import './header.css'
import themeConfig from '../../../configs/themeConfig'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '@store/actions/user.action.js'
import { Button } from 'reactstrap'


const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.currentUser)

  const jwtToken = localStorage.getItem('jwtToken')
  const isAdmin = localStorage.getItem('isAdmin')

  const isUserAdmin = isAdmin === 'true' ? true : false
  let isUserLoggedIn = false

  if (jwtToken) {
    isUserLoggedIn = true
  }


  const logout = () => {
    dispatch(Logout())
  }
  return (
    <header className='d-flex algin-items-center justify-content-between'>
      <div className='d-flex align-items-center'>
        <div>
          <img src={themeConfig.app.appLogoImage} />
        </div>
        <div>  
          <h2 className='ml-2 text-dark title'>The INFIN  <span className='text-secondary'>| Employee Portal</span></h2>
        </div>
      </div>
      {isUserLoggedIn ? 
        <div className='d-flex align-items-center'>
           <h4 className='mr-2 mb-0 mt-0 text-dark'>Hey <span style={{color: "rgb(51, 102, 255)"}}>{user.firstName}</span>!</h4>
          <Button className='mr-2 mr-2 mb-0 mt-0' color='primary' onClick={() => logout()}>Logout</Button> 
        </div>
        
        : null
      }
      
    </header>
  )
}

export default Header
