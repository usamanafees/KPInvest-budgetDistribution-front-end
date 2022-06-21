import { useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FeedbackTable } from './list'
import { Row, Col, Card, Button, CardBody, Media, Input } from 'reactstrap'

const Feedback = () => {
  return (
    <>
      <div id='Home-analytics'>
       <Row className='match-height'>
         <h3 className='ml-1' style={{ fontWeight: 600 }}>User Feedback</h3>
       </Row>
       <Row className='match-height'>
         <Col xs='12'>
           <FeedbackTable />
         </Col>
       </Row>
      </div>
    </>   
  )
}
export default Feedback
