import { useState, useEffect } from 'react'
import { Upload, X } from 'react-feather'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Label, FormGroup, Input, Form, CustomInput, Row, Col, Card } from 'reactstrap'
// ** Store & Actions
import { addUser } from '../../../redux/actions/user.action'

const createEmployee = props => {
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [teams, setTeams] = useState([])
    const users = props.users
    const totalUsers = props.totalUsers
    // Manage options for react select
    const teamData = []
    const selectedTeam = []
    if (props.teams.length > 0) {
        props.teams.forEach(element => {
            const team = { value: element.id, label: element.teamName }
            teamData.push(team)
            // if (teams & teams === element.id) {
            //     selectedTeam.push(team)
            // }
        })
    }

    // handle team
    const handleTeam = (e) => {
        if (e && e.length > 0) {
        const array = []
        e.map(obj => {
            array.push(obj.value)
        })
            setTeams(array)
        } else {
            setTeams([])
        }
    }

    //Form Validate
    const isUserReady = () => {
        return (firstName !== "" && lastName !== "" && email !== "" && teams.length !== 0)
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
            firstName,
            lastName,
            email,
            teams
        }
        dispatch(addUser(user, users, totalUsers))
        props.toggle()
    }

    return (
        <Form>
            <Row>
                <Col sm='12'>
                <FormGroup>
                    <Label for='nameVertical'>First Name</Label>
                    <Input type='text' value={firstName} name='fistName' id='nameVertical' onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
                </FormGroup>
                </Col>
                <Col sm='12'>
                <FormGroup>
                    <Label for='nameVertical'>Last Name</Label>
                    <Input type='text' value={lastName} name='lastName' id='nameVertical' onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
                </FormGroup>
                </Col>
                <Col sm='12'>
                <FormGroup>
                    <Label for='EmailVertical'>Email</Label>
                    <Input type='email' value={email} name='email' id='EmailVertical' onChange={validateEmail} placeholder='Email' />
                    {(isValidEmail === false && email !== "") &&
                    <small className="form-text text-danger">Invalid Email</small>}
                </FormGroup>
                </Col>
                <Col sm='12'>
                <FormGroup>
                    <Label for='mobileVertical'>Tags</Label>
                    <Select
                        name="teams"
                        isMulti
                        // defaultValue={selectedTeam}
                        onChange={handleTeam}
                        options={teamData}
                        closeMenuOnSelect={true}
                        isClearable
                        className=""
                    />
                </FormGroup>
                </Col>
                <Col sm='12'>
                <FormGroup className='d-flex mb-0'>
                    {/* <Button.Ripple style={{ padding: "2px 3px"}} className='mr-1' size="sm" disabled outline color='secondary'>
                        <Upload size={15} /> Upload CSV
                    </Button.Ripple> */}
                    <Row style={{paddingTop:"10px"}}>     
                        <Col lg={12}>
                            <Button.Ripple size="md" disabled={!isUserReady()} color='primary' onClick={(e) => handleSubmit(e)}>
                                Submit
                            </Button.Ripple>
                        </Col>
                        <Col lg={12} style={{paddingTop: "15px"}}>
                            <p style={{ color: 'rgba(41, 82, 204, 1)'  }}> <span style={{ fontWeight: '500' }}>NOTE:</span> This will also send a welcome email, with instructions for them to reset their password.</p>
                        </Col>
                    </Row>

                </FormGroup>
                </Col>
            </Row>
        </Form>
    )
}
export default createEmployee