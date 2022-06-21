import { UsersTable } from './list'
import { Row, Col } from 'reactstrap'

const Settings = () => {
  
  return (
    <>
      <div id='Home-analytics'>
       <Row className='match-height'>
         <h3 className='ml-1' style={{ fontWeight: 600 }}>Global Settings</h3>
       </Row>
       <Row className='match-height'>
         <Col xs='12'>
           <UsersTable />
         </Col>
       </Row>
      </div>
    </>  
  )
}
export default Settings
