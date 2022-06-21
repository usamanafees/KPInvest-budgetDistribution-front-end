// ** React Imports
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
// ** Third Party Components
import { Button, Label, Modal, ModalBody, Input, CustomInput, Row, Col, Card, CardBody } from 'reactstrap'
import {
    Edit,
    Trash2,
    X
  } from 'react-feather'
import { getAllTeams, editTeam, deleteTeam } from '../../../redux/actions/teams.action'


  // Sorting by team name   
  const caseInsensitiveSort = (rowA, rowB) => {
    const a = rowA.teamName.toLowerCase()
    const b = rowB.teamName.toLowerCase()
    if (a > b) {
        return 1
    }
  
    if (b > a) {
        return -1
    }
    return 0
  }

  const renderEdit = row => {
    const dispatch = useDispatch()
    const props = useSelector(state => state.teams)
    const teams = props.allTeams
    // Modal open state
    const [modal, setModal] = useState(false)
    // Toggle for Modal
    const toggle = () => setModal(!modal)
    // team name state
    const [teamName, setTeamName] = useState('')
    // handle submit
    const handleSubmit = () => {
      const data = {
         teamId: row.id,
         teamName
      }
      dispatch(editTeam(row.id, data))
      toggle()
    }
    // get teams
    useEffect(() => {
      setTeamName(row.teamName)
      dispatch(getAllTeams())
    }, [dispatch, teams.length])  
    return (
      <>
        <Edit onClick={toggle} className='cursor-pointer text-secondary' size={20} />
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
                      Edit Team
                    </h3> 
                </Col>
                <Col sm="6" lg="2">
                    <X onClick={toggle} className='cursor-pointer' size={20} />
                </Col>
              </Row>
            </div>
            <ModalBody className="m-1">
              <Row>
                <Input name="teamName" value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Enter team name" />
                <Button.Ripple disabled={!teamName} size="sm" onClick={() => handleSubmit()} className="mt-1" color='primary'> Edit </Button.Ripple>
              </Row>
            </ModalBody>
        </Modal>
      </>
    )
  }

  const renderDelete = row => {
    const dispatch = useDispatch()
    const [modalDel, setModalDel] = useState(false)
    const togglDell = () => setModalDel(!modalDel)
    const handleDelete = () => {
      dispatch(deleteTeam(row.id))
      togglDell()
    }
      return (
          <>
            <Trash2 onClick={togglDell} className='cursor-pointer text-danger' size={20} />
            <Modal isOpen={modalDel}
              style={{ 
                  marginTop: 250,
                  maxWidth: 380
              }}
              toggle={togglDell}
              backdrop="static">
              <div className='m-2'>
                <Row>
                  <Col sm="4" lg="10">
                      <h4 style={{ fontWeight: 500, color: "black" }}>
                        Are you sure to delete this Tag?
                      </h4> 
                  </Col>
                  <Col sm="6" lg="2">
                      <X onClick={togglDell} className='cursor-pointer' size={20} />
                  </Col>
                </Row>
              </div>
              <ModalBody className='m-1'>
                {row.totalAssociations === 1 ? 
                  <h4>"{row.teamName}" exits on {row.totalAssociations} user</h4>
                  : row.totalAssociations > 1 ?
                  <h4>"{row.teamName}" exits on {row.totalAssociations} users</h4>
                  : ''

                }
                
                <Row style={{ justifyContent: 'flex-end' }}>
                  <Button.Ripple size="sm" onClick={togglDell} className="mt-1 mr-1" color='secondary'> Cancel </Button.Ripple>
                  <Button.Ripple size="sm" onClick={() => handleDelete()} className="mt-1" color='danger'> Delete </Button.Ripple>
                </Row>
              </ModalBody>
            </Modal>
          </>
      )
  }

// ** Table columns
export const columns = [
    {
        name: '',
        maxWidth: '5px',
        selector: 'id',
        cell: row => renderEdit(row) 
    },
    {
      name: 'Employees',
      maxWidth: '5px',
      selector: 'totalAssociations',
      sortable: true,
      sortFunction: caseInsensitiveSort,
      cell: row => {
        return (
          <div className='d-flex justify-content-left align-items-center'>
            <div className='d-flex flex-column'>
              <h6 className='user-name text-truncate mb-0'>{row.totalAssociations}</h6>
            </div>
          </div>
        )
      }
    },
    {
      name: 'Tag Name',
      // maxWidth: '100px',
      selector: 'teamName',
      sortable: true,
      sortFunction: caseInsensitiveSort,
      cell: row => {
        return (
          <div className='d-flex justify-content-left align-items-center'>
            <div className='d-flex flex-column'>
              <h6 className='user-name text-truncate mb-0'>{row.teamName}</h6>
            </div>
          </div>
        )
      }
    },
    {
      name: 'Owner',
      // maxWidth: '100px',
      selector: 'owner',
      sortable: true,
      sortFunction: caseInsensitiveSort,
      cell: row => {
        return (
          <div className='d-flex justify-content-left align-items-center'>
            <div className='d-flex flex-column'>
              <h6 className='user-name text-truncate mb-0'>{row.owner}</h6>
            </div>
          </div>
        )
      }
    },
    {
      name: 'Created Date',
      // maxWidth: '100px',
      selector: 'createdAt',
      sortable: true,
      // sortFunction: caseInsensitiveSort,
      cell: row => {
        return (
          <div className='d-flex justify-content-left align-items-center'>
            <div className='d-flex flex-column'>
              <h6 className='user-name text-truncate mb-0'>{moment(row.createdAt).format('lll')}</h6>
            </div>
          </div>
        )
      }
    },
    {
      name: 'Action',
      selector: 'action',
      maxWidth: '100px',
      cell: row => renderDelete(row)
    }
  ]
  