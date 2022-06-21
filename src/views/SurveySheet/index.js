import { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './header'
import SheetContent from './SheetContent'
// reactstrap items
import { Card, CardBody, Row, Col, Label, Input, Button, FormGroup, CardHeader, Collapse } from 'reactstrap'
// To get id from from url
import { useParams } from "react-router-dom"
// ** Store & Actions
import { editUser } from '../../redux/actions/user.action'


const SurveySheet = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const props = useSelector(state => state.users)
    //props
    const userData = props.currentUser

    useEffect(() => {
        if (userData.link_key === params.id && userData.link_opened === false) {
            dispatch(editUser(userData.id, {link_opened: true}))
        }
    }, [userData])

    return (
        <>
            {/* Header */}
            <Header />
            <div className='container'>
                {userData.isActive === true ? <SheetContent /> : <>
                    {/* Welcome For In Active User */}
                    <Card  style={{ border: '2px solid rgba(51, 102, 255, 1)' }}>
                        <div className='m-1 text-center'>
                            <h1 style={{ fontWeight: 600, color: 'black' }}>Welcome {`${userData.firstName ? userData.firstName : ""} ${userData.lastName ? userData.lastName : ""}`}</h1>
                            <p className='mt-1'>There is currently no active exercise. Please check back when instructed to do so.</p>         
                        </div> 
                    </Card>     
                </>}
                
                {/* Footer div */}
                <div><br /></div>
            </div>
        </>
    )
}

export default SurveySheet
