import { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import _ from 'lodash'
import moment from 'moment'
import { columns } from './columns'
import DataTable from 'react-data-table-component'
import { CSVLink, CSVDownload } from "react-csv"
// To get id from from url
import { useParams } from "react-router-dom"
// Bar Chart
import BarChart from './ChartjsBarChart'
// reactstrap items
import { Card, CardBody, Row, Col, Label, Input, Button, FormGroup, CardHeader, Collapse } from 'reactstrap'
// ** Store & Actions
import { getAllUsers, getTeams } from '../../redux/actions/user.action'
import { sendFeedback, getAllComments } from '../../redux/actions/feedback.action'
import { getQuestion } from '../../redux/actions/questions.action'

// React Feather Icons
import { Bold, ChevronDown, Info, RefreshCcw, DownloadCloud } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const CustomHeader = ({ Teams, teamData, csvData, handleTeam, isAll, setIsAll }) => {
    const dispatch = useDispatch()
    return (
      <div className='invoice-list-table-header w-100 py-2'>
        <Row>
          <Col lg='2' className='d-flex align-items-center px-0 px-lg-1'>
            <div className='d-flex align-items-center mr-2'>
                <span style={{ ...isAll === true ? {background: '#E6E8F0', padding: 8, borderRadius:3, color: 'blue'} : {} }} className='cursor-pointer' onClick={() => setIsAll(true)}>All</span>
                <span style={{ ...isAll === false ? {background: '#E6E8F0', padding: 8, borderRadius:3, color: 'blue'} : {} }} className='ml-2 cursor-pointer' onClick={() => setIsAll(false)}>Only My Tags</span>  
            </div>
          </Col>
          <Col lg='10' className='mt-lg-0 mt-1 pr-lg-1 p-0'>
            <div className='col-12 d-flex'>
              <span className='col-md-2 d-flex align-items-center' style={{ fontWeight: 500 }} >Tags</span>
              <Select
                name="Teams"
                className='col-md-8'
                isMulti
                value={Teams}
                onChange={handleTeam}
                options={teamData}
                closeMenuOnSelect={true}
                isClearable
              />
                {/* Export CSV */}
                {/* <CSVLink 
                    data={csvData} 
                    filename={"employees.csv"}
                    target="_blank"
                >
                    <DownloadCloud size='20' className="mt-1 ml-1 cursor-pointer" />
                </CSVLink> */}
                {/* Refresh Table icon */}
                <RefreshCcw className='col-1 mt-1 cursor-pointer' size={20} onClick={() => dispatch(getAllUsers())} />
            </div>  
          </Col>
          {/* <Col lg="1" className='mt-lg-0 mt-1 pr-lg-1 p-0'>
          </Col> */}
        </Row>
      </div>
    )
}

const SheetContent = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const props = useSelector(state => state.users)
    const feedback = useSelector(state => state.feedback)
    const questions = useSelector(state => state.questions)

    // Chart Vars
    const primaryColorShade = 'rgba(51, 102, 255, 0.75)',
    labelColor = '#6e6b7b',
    tooltipShadow = 'rgba(0, 0, 0, 0.25)',
    gridLineColor = 'rgba(200, 200, 200, 0.2)'
    //props
    const userData = props.currentUser
    const allUsers = props.allUsers
    const teams = props.teamsList
    const allComments = feedback.allComments

    // Updated user Object
    const createdComment = feedback.createdComment

    // States
    const [isAll, setIsAll] = useState(true)
    const [collapse, setCollapse] = useState(true)
    const [Teams, setTeams] = useState(null)
    const [comment, setComment] = useState('')
    const [question, setQuestion] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])
    // handle collapse
    const toggle = () => setCollapse(!collapse)

    const teamData = []
    const selectedTeams = []
    if (teams.length > 0) {
        teams.forEach(element => {
            const teams = { value: element.id, label: element.teamName }
            teamData.push(teams)
        })
    }
    const handleTeam = (e) => {
        if (e && e.length > 0) {
            setTeams(e)
        } else {
            setTeams(teamData)
        }
    }

    // filter only my comments from all comments
    const myComments = allComments.filter(e => e.UserId === userData.id)
    
    //  Get All Comments
    useEffect(() => {
        dispatch(getAllComments())
    }, [dispatch, allComments.length])

    // Get all updated comments
    useEffect(() => {
        dispatch(getAllComments())
        // ** _.isEmpty use for check empty object, if object empty
        // it returns true
        if (!_.isEmpty(createdComment)) {
            allComments.push(createdComment)
        }
    }, [dispatch, createdComment])
    // Get Teams
    useEffect(() => {
        dispatch(getTeams())
        setTeams(teamData)
    }, [dispatch, teams.length])  
    // Get Users
    useEffect(() => {
    dispatch(
        getAllUsers()
    )
    }, [dispatch, allUsers.length])
    useEffect(() => {
        dispatch(getQuestion())
     }, [])  

    useEffect(() => {
        if (questions.questionAuth) {
        setQuestion(questions.questionValue[0]?.question)
        }
    }, [questions.questionAuth])


    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            comment,
            UserId: userData.id
        }
        dispatch(sendFeedback(data))
        setComment("")
    }

    const dataToRender = () => {
        // remove current user from all users
        const userId = userData.id
        const filteredUsers = allUsers.filter(val => val.id !== userId)
        // filter users on teams tags
        const filtered = []
        for (const user in filteredUsers) {
            const teams = filteredUsers[user].teams
            for (const team in teams) {
                for (const filter in Teams) {
                    if (teams[team].id === Teams[filter].value) {
                      filtered.push(filteredUsers[user])
                    }
                }
            }
        }
        // Get unique data from above array
        const uniqueArr = filtered.filter((v, i, a) => a.findIndex(t => (t.id === v.id && t.email === v.email)) === i)

        // filter user for all Users or only My team
        const userTeams = userData.teams
        const myTeamArr = []
        if (isAll === true) {
            return uniqueArr
        } else if (isAll === false) {
            for (let i = 0; i < filteredUsers.length; i++) {
                const users = filteredUsers[i]
                let found = false
                for (let j = 0; j < users.teams.length; j++) {
                    found = userTeams.some(el => el.id === users.teams[j].id)
                    if (found === true) { break }
                }
                if (found === true) {
                    myTeamArr.push(users)
                }
            }
                return myTeamArr
        } else {
            return filteredUsers
        }
        // return filtered
    }

    return (
        <Fragment>
            {/* Welcome */}
            <Card>
                <div className='m-2'>
                    <h1 style={{ fontWeight: 600 }}>Welcome {`${userData.firstName ? userData.firstName : ""} ${userData.lastName ? userData.lastName : ""}`}.</h1>
                    <div className='mt-1' style={{ fontSize: 15, border: '2px solid rgba(51, 102, 255, 1)', backgroundColor: '#e2eff2', borderRadius: 5, textAlign: 'justify' }}>
                        <div className='m-1'>
                            {/* <p>The goal of this exercise is to begin building an understanding of how the network of people within our organization rates each other’s contribution. The system is designed to be a fair, accurate, and entirely democratic. There is no ‘top-down’ subjectivity, only an aggregation of each person’s opinion. There is a natural weighing in output such that an individual’s vote counts in proportion to how they are valued by their peers – those who are more highly esteemed (as determined by others) have a greater say in the evaluation of others. Please be as accurate, thoughtful, and consistent as possible, and do not try to ‘game’ the system.</p>
                            <p>Ratings are determined on a ‘relative’ basis, not an ‘absolute’ basis. You can use any scoring system you want, just keep it consistent. For example, if you rate [10] for Person A, and [20] for Person B, that is exactly the same as rating [2] for Person A, and [4] for Person B. Similarly, both examples will yield the same result as rating [25] for Person A, and [50] for Person B. More practically, all of these examples mean you rate the contribution of Person B to be twice that of Person A. Someone could have 1x (the same), 4x, 10x or 162x the impact of another person, in your view, so please consider a full spectrum of contribution. Remember, the goal is to have everyone you rate be in proportional alignment to one another.</p>
                            <p>You will not rate yourself, and you do not need to rate everybody. Only rate the people for whom you believe you have a well-informed opinion, work regularly with, or can consistently and accurately evaluate.</p> */}
                            <p>Thank you for your participation!</p>
                        </div>
                    </div>
                    <Card className='mt-2'>
                        <div className='mt-1 ml-1'>
                            <Row>
                                <Col style={{ maxWidth: 40 }}>
                                    <Info size="20" color='blue' />
                                </Col>
                                <Col lg="11" sm="12">
                                    <p style={{ color: 'rgba(41, 82, 204, 1)' }}> <span style={{ fontWeight: '500' }}>NOTE:</span> Calculations will occur after saving a new value or refreshing the page.</p>
                                    <p className='mt-1'>Every time you enter a value below and save, the model will recalculate percentages. If your input is not responding, you can refresh this page. You are also welcome to revisit this URL at any time to change your previously entered values.</p>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </div> 
            </Card>
            {/* Chart Section */}
            <Card>
                <div className='m-2'>
                    <Row>
                        <Col lg="2" sm="12">
                            <h1 style={{ fontWeight: 600, color: 'black' }}>Current Standing</h1>
                            <p className='mt-2'>Based on current filters, your current standing is displayed here. This accounts all active input from team members who have taken part in this exercise to date.</p>
                        </Col>
                        <Col lg="10" sm="12">
                            <BarChart
                                primaryColorShade={primaryColorShade}
                                labelColor={labelColor}
                                tooltipShadow={tooltipShadow}
                                gridLineColor={gridLineColor}
                                allUsers={allUsers}
                                userData={userData}
                                Teams={Teams}
                            />
                        </Col>
                    </Row>
                </div>
            </Card>
            {/* Question Card */}
            <Card style={{ background: "rgb(47 98 250)" }}>
                <div style={{ marginTop: 20, marginLeft: 30, padding: 10, color: "white" }}>
                    <p style={{ fontSize: 22 }}><span><b>Current Question:</b> </span> <strong>{question}</strong></p>
                </div>
            </Card>
            {/* Employee input Table */}
            <Card>
                <div className='m-2'>
                    <h2 style={{ fontWeight: 600 }}>Employee Input</h2>
                    <Row className='match-height'>
                        <Col xs="12">    
                            <div className='invoice-list-wrapper'>
                                <div className='invoice-list-dataTable'>
                                    <DataTable
                                        noHeader
                                        subHeader={true}
                                        columns={columns}
                                        responsive={true}
                                        sortIcon={<ChevronDown />}
                                        className='react-dataTable'
                                        data={dataToRender()}
                                        subHeaderComponent={
                                        <CustomHeader
                                            teamData={teamData}
                                            selectedTeams={selectedTeams}
                                            handleTeam={handleTeam}
                                            Teams={Teams}
                                            // csvData={csvData}
                                            isAll={isAll} 
                                            setIsAll={setIsAll}
                                        />
                                        }
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Card>
            {/* Comment Sectoin */}
            <Card>
                <div className='m-2'>
                    {/* Send Feedback */}
                    <h2 style={{ fontWeight: 600 }}>Send Feedback</h2>
                    <FormGroup>
                        <Input name="comment" rows="4" type="textarea" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Enter your feedback here..." />
                        <Button.Ripple className="mt-1" disabled={comment === ''} color='primary' onClick={(e) => handleSubmit(e)}>Submit</Button.Ripple>
                    </FormGroup>
                    {/* My Comments */}
                    <div className='mt-5' style={{ border: '1px solid rgba(51, 102, 255, 1)', borderRadius: 5 }}>
                        <Card>
                            <CardHeader className='cursor-pointer' onClick={toggle} style={{ margin: 30, background: 'aliceblue' }}>
                                <Row className='actions-right d-flex align-items-center w-100'>
                                    <Col lg='11' md='11' sm='7'>
                                        <h1 style={{ fontWeight: 600 }}>My Comments</h1>
                                    </Col>
                                    <Col lg='1' md='1'> 
                                        <ChevronDown className='ml-5' size="20" />
                                    </Col>
                                </Row>
                            </CardHeader>
                            {/* Collapse */}
                            <Collapse isOpen={collapse}>
                                <Card>
                                    <CardBody className='m-1'>
                                        {myComments.length > 0 ? myComments.map((item, index) => (
                                            <Fragment key={index}>
                                                <Row key={index}>
                                                    <Col lg="10" md='8' sm="12">
                                                        <span>{item.comment}</span>
                                                    </Col>
                                                    <Col lg="2" md='4' sm='12'>
                                                        <span>{moment(item.createdAt).local().format('MMM Do YYYY | hh:mm a ')}</span>
                                                    </Col>
                                                </Row>
                                                <hr />
                                            </Fragment>
                                        )) : <span>You don't have any comment yet.</span>}
                                    </CardBody>
                                </Card>
                            </Collapse>
                        </Card>
                    </div>
                </div>
            </Card>
        </Fragment>
    )
}

export default SheetContent
