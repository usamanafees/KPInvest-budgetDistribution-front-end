import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import themeConfig from '../configs/themeConfig'
// ** Store & Actions
import { login } from '../redux/actions/user.action'

const Login = () => {
  const dispatch = useDispatch()

  // States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(true)
  //Form Validate
  const isUserReady = () => {
    return (password !== "" && email !== "")
}

//Validate Email
const validateEmail = (event) => {
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (reg.test(event.target.value) === false) {
      setEmail(event.target.value)
      setIsValidEmail(false)
    } else {
      setEmail(event.target.value)
      setIsValidEmail(true)
    }
}

// Submit User
const handleSubmit = (e) => {
    e.preventDefault()
    const user = {
        email,
        password
    }
    dispatch(login(user))
}

  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/'>
              <img src={themeConfig.app.appLogoImage} />
              <h2 className='brand-text text-secondary ml-2 mt-2'>DRG <span style={{fontSize:'1.1rem'}}>Invest</span></h2>
            </Link>
            <CardTitle tag='h4' className='text-center mb-1'>
              Welcome to DRG <span style={{fontSize:'0.9rem'}}>Invest</span> 👋
            </CardTitle>
            <CardText className='text-center mb-2'>Please sign-in to your account and start your</CardText>
            <Form className='auth-login-form mt-2'>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input type='email' name="email" id='login-email' onChange={validateEmail} placeholder='Enter Email' autoFocus invalid={!isValidEmail}/>
                {(isValidEmail === false && email !== "") &&
                  <small className="form-text text-danger">Invalid Email</small>}
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                </div>
                <InputPasswordToggle name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" className='input-group-merge' id='login-password' />
              </FormGroup>
              <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup>
              <Button.Ripple disabled={!isUserReady()} color='primary' onClick={(e) => handleSubmit(e)} block>
                Login
              </Button.Ripple>
              
              <Link to="/forgotPassword">
                <Button.Ripple color='link' block>
                    Forgot Password?
                </Button.Ripple>
              </Link>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Login
