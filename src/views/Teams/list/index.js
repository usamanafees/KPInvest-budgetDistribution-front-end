// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// Lodash Function
import _ from 'lodash'
// ** Table Columns
import { columns } from './columns'
// ** Third Party Components
import { ChevronDown, Compass, Download, Save, PlusCircle, X } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Button, Label, Modal, ModalBody, Input, CustomInput, Row, Col, Card, CardBody } from 'reactstrap'
// ** Store & Actions
import { getAllTeams, addTeam, clearDelTeamProp } from '../../../redux/actions/teams.action'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const CustomHeader = ({ handleFilter, q  }) => {
  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        {/* Search from table */}
        <Col lg='5' className='actions-left d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0'>
          <div className='d-flex align-items-center w-100'>
            <Label className='col-md-3' style={{ fontWeight: "bold" }} for='search-teams'>Search From Table</Label>
            <Input
              id='search-teams'
              className=''
              type='text'
              value={q}
              onChange={e => handleFilter(e.target.value.replace(/[&\/\\,+()$~%.'":*?<>{}]/g, ""))}
              placeholder='Search Tags'
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export const TeamsTable = () => {
  const dispatch = useDispatch()
  const props = useSelector(state => state.teams)
  const allTeams = props.allTeams
  const createdTeam = props.createdTeam
  const updatedTeam = props.updatedTeam
  const deletedTeam = props.deletedTeam
  const createdBy = useSelector(state => state.users.currentUser.id)
  const [teamName, setTeamName] = useState('')
   // Modal open state
   const [modal, setModal] = useState(false)
   // Toggle for Modal
   const toggle = () => setModal(!modal)

  // Get All teams
  useEffect(() => {
    dispatch(getAllTeams())
  }, [dispatch, allTeams.length])  

  // gete all teams when team created or updatde
  useEffect(() => {
    dispatch(getAllTeams())
    dispatch(clearDelTeamProp())
  }, [dispatch, createdTeam, updatedTeam, deletedTeam]) 

  // handle Filter
  const [q, setQ] = useState('')
  const handleFilter = val => {
    setQ(val)
  }

  const handleSubmit = () => {
    dispatch(addTeam({ teamName, createdBy}))
    toggle()
  }

  const dataToRender = () => {
      const searchQuery = q.toLowerCase()
      const filtered = allTeams.filter(el => {
        return el.teamName.toLowerCase().match(new RegExp(searchQuery, 'g'))
      }) 

      return filtered
  }
  
  return (
    <Fragment>
      {/* Teams Table */}
      <div className='invoice-list-wrapper'>
        <Card>
          <div className='invoice-list-dataTable'>
            <DataTable
              noHeader
              pagination
              subHeader={true}
              columns={columns}
              responsive={true}
              sortIcon={<ChevronDown />}
              className='react-dataTable'
              data={dataToRender()}
              subHeaderComponent={
                <CustomHeader
                  q={q}
                  handleFilter={handleFilter}
                />
              }
            />
          </div>
          {/* Add Team Button */}
          <Row className='mb-2'>
            <Col lg='8' className='d-flex align-items-center px-0 px-lg-1'>
              <Button.Ripple onClick={toggle} className="ml-2" color='primary'>
                <PlusCircle size={17} /> &nbsp; Add Tag
              </Button.Ripple>
            </Col>
          </Row>
          {/* Add Team modal */}
          <Modal isOpen={modal}
          style={{ 
              marginTop: 250,
              maxWidth: 280
          }}
          toggle={toggle}
          backdrop="static">
            <div className='m-2'>
              <Row>
                <Col sm="4" lg="10">
                    <h3 style={{ fontWeight: 600, color: "black" }}>
                      Add Tag
                    </h3> 
                </Col>
                <Col sm="6" lg="2">
                    <X onClick={toggle} className='cursor-pointer' size={20} />
                </Col>
              </Row>
            </div>
            <ModalBody className="m-1">
              <Row>
                <Input name="teamName" onChange={(e) => setTeamName(e.target.value)} placeholder="Enter new tag" />
                <Button.Ripple disabled={!teamName} size="sm" onClick={() => handleSubmit()} className="mt-1" color='primary'> Add </Button.Ripple>
              </Row>
          </ModalBody>
          </Modal>
        </Card>
      </div>
    </Fragment>
  )
}

export default TeamsTable