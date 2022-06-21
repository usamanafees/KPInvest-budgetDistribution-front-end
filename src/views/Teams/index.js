import TeamsTable from '@src/views/Teams/list'
import { Row, Col, Card, Button, CardBody, Media, Input } from 'reactstrap'
// ** Store & Actions
// import { getBonusbyId, updateBonus } from '../../redux/actions/settings.action'
import Login from '../Login'

const Teams = () => {
  const isUserLoggedIn = localStorage.getItem('login')
  return (
    <>
    {/* {isUserLoggedIn === null ? <Login /> : <> */}
    <>
      <div id='Home-analytics'>
       <Row className='match-height'>
         <h3 className='ml-1' style={{ fontWeight: 600 }}>All Tags</h3>
       </Row>
       <Row className='match-height'>
         <Col xs='12'>
           <TeamsTable />
         </Col>
       </Row>
      </div>
    </>  
    {/* } */}
    </>   
  )
}

export default Teams
