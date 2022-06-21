import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { Button, Label, FormGroup, Input, Form, CustomInput, Row, Col, Card } from 'reactstrap'
// ** Store & Actions
import { getUserbyId, editUser } from '../../../redux/actions/user.action'

const editEmployee = props => {
    const dispatch = useDispatch()
    const propData = useSelector(state => state.users)
    const userData = propData.userData
    const users = props.users
    const totalUsers = props.totalUsers
    // Manage Staes
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [teams, setTeams] = useState([])
    const teamData = []
    const selectedTeams = []

    useEffect(() => {
        dispatch(getUserbyId(props.rowId))
    }, [dispatch])

    const teamState = []
    if (!_.isEmpty(userData)) {
        userData.teams.forEach(element => {
            const team = {value: element.id, label: element.teamName}
            teamState.push(team)
        })
    }
    useEffect(() => {
        setFirstName(userData?.firstName)
        setLastName(userData?.lastName)
        setEmail(userData?.email)
        setTeams(teamState)
    }, [userData])
    
    if (props.teams.length > 0) {
        props.teams.forEach(element => {
            const team = { value: element.id, label: element.teamName }
            teamData.push(team)
            for (const t in teams) {
                const el = teams[t]
                if (el.value === element.id) {
                    selectedTeams.push(team)
                }
            }
        })
    }

    const handleTeam = (e) => {
        if (e && e.length > 0) {
            setTeams(e)
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
        const teamArr = []
        teams.forEach(el => {
            teamArr.push(el.value)
        })
        e.preventDefault()
        const obj = {
            firstName,
            lastName,
            email,
            teams: teamArr
        }
        dispatch(editUser(props.rowId, obj))
        props.toggle()
    }
    return (
        <Form>
            <Row>
                <Col sm='12'>
                <FormGroup>
                    <Label for='nameVertical'>First Name</Label>
                    <Input type='text' name='fistName' value={firstName} id='nameVertical' onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
                </FormGroup>
                </Col>
                <Col sm='12'>
                <FormGroup>
                    <Label for='nameVertical'>Last Name</Label>
                    <Input type='text' name='lastName' value={lastName} id='nameVertical' onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
                </FormGroup>
                </Col>
                <Col sm='12'>
                <FormGroup>
                    <Label for='EmailVertical'>Email</Label>
                    <Input type='email' name='email' value={email} id='EmailVertical' onChange={validateEmail} placeholder='Email' />
                    {(isValidEmail === false && email !== "") &&
                    <small className="form-text text-danger">Invalid Email</small>}
                </FormGroup>
                </Col>
                <Col sm='12'>
                <FormGroup>
                    <Label for='mobileVertical'>Tags</Label>
                    <Select
                        name="teams"
                        value={selectedTeams}
                        onChange={handleTeam}
                        options={teamData}
                        closeMenuOnSelect={true}
                        isClearable
                        isMulti
                    />
                </FormGroup>
                </Col>
                <Col sm='12'>
                <FormGroup className='d-flex mb-0'>
                    <Button.Ripple size="md" disabled={!isUserReady()} color='primary' onClick={(e) => handleSubmit(e)}>
                        Update
                    </Button.Ripple>
                </FormGroup>
                </Col>
            </Row>
        </Form>
    )
}
export default editEmployee