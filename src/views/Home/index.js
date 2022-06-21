import { useContext, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContributionTable from '@src/views/Home/list'
import { Row, Col, Card, Button, CardBody, Media, Input } from 'reactstrap'

const Home = () => {
  return (
    <>
      <div id='Home-analytics'>
       <Row className='match-height'>
         <h3 className='ml-1' style={{ fontWeight: 600 }}>Table Contribution Output</h3>
       </Row>
       <Row className='match-height'>
         <Col xs='12'>
           <ContributionTable />
         </Col>
       </Row>
      </div>
    </>
  )
}

export default Home
