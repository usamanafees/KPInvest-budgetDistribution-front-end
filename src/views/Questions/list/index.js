// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// Lodash Function
import _ from 'lodash'
// ** Table Columns
import { columns } from './columns'
// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Button, Label, Modal, ModalBody, Input, CustomInput, Row, Col, Card, CardBody, FormGroup } from 'reactstrap'
// ** Store & Actions
import { getAllUsers, bulkUpdateUsers } from '../../../redux/actions/user.action'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const CustomHeader = ({ handleIsActive, isActive }) => {
  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        {/* All Users Active or In Active */}
        <Col lg="6" md="6"><p style={{ fontWeight: 'bold' }} className='col-6'>All Users</p></Col>
        <Col lg='6' md="6" className='actions-left d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0'>
          <div className='d-flex align-items-center'>    
            <FormGroup>
              <CustomInput type='switch' id='isActive' value={isActive} name='isActive' checked={isActive} onChange={(e) => handleIsActive(e)} />
            </FormGroup>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export const UsersTable = () => {
  const dispatch = useDispatch()
  const props = useSelector(state => state.users)
  const allUsers = props.allUsers
  const isActiveProp = props.isActive

  // Get bonus pool value by id
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch, allUsers.length])

  // state
  const [isActive, setIsActive] = useState()

  useEffect(() => {
    let flag = true
    for (let i = 0; i < allUsers.length; i++) {
        const element = allUsers[i]
        if (element.isActive === false) {
            flag = false
        } else {
            flag = true
            break
        }        
    }
    setIsActive(flag)
  }, [allUsers.length])

  const handleIsActive = e => {
    if (isActive === true) {
      setIsActive(false)
      dispatch(bulkUpdateUsers({isActive: false}))
    } else if (isActive === false) {
      setIsActive(true)
      dispatch(bulkUpdateUsers({isActive: true}))
    }
  }

return (
  <div className='container invoice-list-table-header w-100 py-2'>
    <Card>
      <Row className="mt-1">
        {/* All Users Active or In Active */}
        <Col lg="6" md="6">
          <p style={{ fontWeight: 'bold' }} className='col-6'>Manage All Users <small>(Active / InActive)</small></p>
        </Col>
        <Col lg='6' md="6" className='actions-left d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0'>
          <div className='d-flex align-items-center'>    
            <FormGroup>
              <CustomInput type='switch' id='isActive' value={isActive} name='isActive' checked={isActive} onChange={(e) => handleIsActive(e)} />
            </FormGroup>
          </div>
        </Col>
      </Row>
    </Card>
  </div>
)
  
  // return (
  //   <Fragment>
  //     {/* Employees Table */}
  //     <div className='invoice-list-wrapper'>
  //       <Card>
  //         <div className='invoice-list-dataTable'>
  //           <DataTable
  //             noHeader
  //             pagination
  //             subHeader={true}
  //             columns={columns}
  //             responsive={true}
  //             sortIcon={<ChevronDown />}
  //             className='react-dataTable'
  //             data={allUsers}
  //             subHeaderComponent={
  //               <CustomHeader
  //                 isActive={isActive}
  //                 handleIsActive={handleIsActive}
  //               />
  //             }
  //           />
  //         </div>
  //       </Card>
  //     </div>
  //   </Fragment>
  // )
}

export default UsersTable
