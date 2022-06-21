import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import themeConfig from '../configs/themeConfig'
// ** Store & Actions
import { forgotPasswordEmail } from '../redux/actions/user.action'

const ForgotPassword = () => {
  const dispatch = useDispatch()

  // States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(true)
  //Form Validate
  const isUserReady = () => {
    return (email !== "")
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
    
    dispatch(forgotPasswordEmail(email))
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
              Uhoh, forgot your password?
            </CardTitle>
            <CardText className='text-center mb-2'>Enter your email address below to verify your identity.</CardText>
            <Form className='auth-login-form mt-2'>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input type='email' name="email" id='login-email' onChange={validateEmail} placeholder='Enter Email' autoFocus invalid={!isValidEmail}/>
                {(isValidEmail === false && email !== "") &&
                  <small className="form-text text-danger">Invalid Email</small>}
              </FormGroup>

              <Button.Ripple disabled={!isUserReady()} color='primary' onClick={(e) => handleSubmit(e)} block>
                Submit
              </Button.Ripple>
              
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ForgotPassword
