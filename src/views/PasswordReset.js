import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import InputPasswordToggle from '@components/input-password-toggle'
import { Card, CardBody, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import themeConfig from '../configs/themeConfig'
// ** Store & Actions
import { verifyResetToken, resetPassword } from '../redux/actions/user.action'

const PasswordReset = () => {
  const dispatch = useDispatch()

  // States
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(true)
  const [passwordToken, setPasswordToken] = useState(window.location.href.split('/').pop())

  useEffect(() => {
    //Verify
    dispatch(verifyResetToken(passwordToken))
  }, [])

  //Form Validate
  const isUserReady = () => {
    return (password !== "" && passwordError === "")
}

//Validate Password
const validatePassword = (event) => {
  const password = event.target.value
  setPassword(password)
  //Characters
  const regexForPass = /^[a-zA-Z0-9!@#$&()\\-`.+,/\"]+$/i
  if (!regexForPass.test(password)) {
      setPasswordError("Invalid Character used.")
      return
  }

  //Length
  if (password.length < 7) {
      setPasswordError("Password must have at least 8 characters")
      return
  }

  setPasswordError("")
}

// Submit User
const handleSubmit = (e) => {
    e.preventDefault()
    
    dispatch(resetPassword(password, passwordToken))
}
  return (
    <div className='auth-wrapper auth-v1 px-2'>
      <div className='auth-inner py-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/'>
              <img src={themeConfig.app.appLogoImage} />
              <h2 className='brand-text text-secondary ml-2 mt-2'>DRG <span style={{fontSize:'1.1rem'}}>Invest</span> </h2>
            </Link>
            <CardTitle tag='h4' className='text-center mb-1'>
              Lets reset your password!
            </CardTitle>
            <CardText className='text-center mb-2'>Enter your new password below.</CardText>
            <Form className='auth-login-form mt-2'>
              <FormGroup>
                <Label className='form-label' for='reset-pass1'>
                  New Password
                </Label>
                <Input type='password' name="password" id='reset-pass1' onChange={validatePassword} placeholder='Enter Password' autoFocus invalid={passwordError !== "" && password !== ""}/>
                {(passwordError !== "" && password !== "") &&
                  <small className="form-text text-danger">{passwordError}</small>}
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

export default PasswordReset
