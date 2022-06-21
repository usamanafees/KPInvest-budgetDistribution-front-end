// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ENV } from '../../../configs/appConfig'
import { Flip, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// ** Custom Components
import Avatar from '@components/avatar'
// ** Store & Actions
import { getTeams, getUsers, deleteUser } from '../../../redux/actions/user.action'
import { Button, Row, Col, Modal, ModalBody, Badge, ModalHeader } from 'reactstrap'
// ** Third Party Components
import {
  Edit,
  X,
  Copy,
  Trash2
} from 'react-feather'
import { ModalComponent } from './modal'

const renderDelete = row => {
  const dispatch = useDispatch()
  const [modalDel, setModalDel] = useState(false)
  const togglDell = () => setModalDel(!modalDel)
  const handleDelete = () => {
    dispatch(deleteUser(row.id))
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
                      Are you sure to delete this User?
                    </h4> 
                </Col>
                <Col sm="6" lg="2">
                    <X onClick={togglDell} className='cursor-pointer' size={20} />
                </Col>
              </Row>
            </div>
            <ModalBody className=''>
              {/* {row.totalAssociations === 1 ? 
                <h4>"{row.teamName}" exits on {row.totalAssociations} user</h4>
                : row.totalAssociations > 1 ?
                <h4>"{row.teamName}" exits on {row.totalAssociations} users</h4>
                : ''

              } */}
              {/* aaaaa */}
              
              <Row style={{ justifyContent: 'flex-end' }}>
                <Button.Ripple size="sm" onClick={togglDell} className="mt-1 mr-1" color='secondary'> Cancel </Button.Ripple>
                <Button.Ripple size="sm" onClick={() => handleDelete()} className="mt-1" color='danger'> Delete </Button.Ripple>
              </Row>
            </ModalBody>
          </Modal>
        </>
    )
}

const renderEdit = row => {
  const dispatch = useDispatch()
  const props = useSelector(state => state.users)
  const users = props.usersList
  const totalUsers = props.totalUsers
  const teams = props.teamsList
  // Modal open state
  const [modal, setModal] = useState(false)
  // Toggle for Modal
  const toggle = () => setModal(!modal)
  // get teams
  useEffect(() => {
    dispatch(getTeams())
    dispatch(getUsers)
  }, [dispatch, teams.length])  
  return (
    <>
      <Edit onClick={toggle} className='cursor-pointer text-secondary' size={20} />
      <ModalComponent 
        rowId={row.id} 
        teams={teams} 
        modal={modal}
        users={users}
        totalUsers={totalUsers} 
        toggle={toggle}
      />
    </>
  )
}

const renderTeams = row => {
  const [modal, setModal] = useState(false)
  // Toggle for Modal
  const toggle = () => setModal(!modal)
  return (
    <>
      <Button.Ripple onClick={toggle} size="sm" color='primary'>
        {row.teams.length === 1 ? `${row.teams.length} tag` : `${row.teams.length} tags`}
      </Button.Ripple>
      <Modal isOpen={modal}
        style={{ 
            marginTop: 250,
            maxWidth: 280
        }}
        toggle={toggle}
        backdrop="static">
          <div className="m-2">
              <Row>
                  <Col sm="4" lg="10">
                      <h3 style={{ fontWeight: 600, color: "black" }}>
                        Tags List
                      </h3> 
                  </Col>
                  <Col sm="6" lg="2">
                      <X onClick={toggle} className='cursor-pointer' size={20} />
                  </Col>
              </Row>
          </div>
          <ModalBody className="m-2">
              {row.teams.map((element, i) => (
                <div key={i}>
                  <span>{element.teamName}</span>
                  <hr />
                </div>
                )
              )}
          </ModalBody>
      </Modal>
    </>
  )
}

const caseInsensitiveSort = (rowA, rowB) => {
  const a = rowA.firstName.toLowerCase()
  const b = rowB.firstName.toLowerCase()
  if (a > b) {
      return 1
  }

  if (b > a) {
      return -1
  }
  return 0
}

const statusSort = (rowA, rowB) => {
  const a = rowA.participation_status
  const b = rowB.participation_status
  if (a > b) {
      return 1
  }

  if (b > a) {
      return -1
  }
  return 0
}

const linkSort = (rowA, rowB) => {
  const a = rowA.link_key.toLowerCase()
  const b = rowB.link_key.toLowerCase()
  if (a > b) {
      return 1
  }

  if (b > a) {
      return -1
  }
  return 0
}

const copyToClipborad = (row, setCopySuccess) => {
  navigator.clipboard.writeText(`${ENV.publicUrl}/iva/${row.link_key}`)
  setCopySuccess('URL Copied!')
  setTimeout(() => {
    setCopySuccess('')
  }, 3000)
}

const renderOutputPercent = (row) => {
  const dispatch = useDispatch()
  const props = useSelector(state => state.users)
  const totalUsers = props.totalUsers
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch, totalUsers.length])
  let totalScore = 0
  totalUsers.map(el => {
    totalScore += el.score
  })
  return (
    <span>{row.score ? `${((row.score / totalScore) * 100).toFixed(4)} %` : `0 %`}</span>
  )
}

// ** Table columns
export const columns = [
  {
    name: '',
    maxWidth: '1px',
    selector: 'id',
    cell: row => renderEdit(row) 
  },
  {
    name: 'Employee',
    minWidth: '270px',
    selector: 'fullName',
    sortable: true,
    sortFunction: caseInsensitiveSort,
    cell: row => {
      const fullName = (`${row.firstName} ${row.lastName}`)
      const email = row.email ? row.email : ''
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            {/* <p className='user-name text-truncate mb-0'>{fullName}</p> */}
            <h6 className='user-name text-truncate mb-0'>{fullName}</h6>
            <small className='text-truncate text-muted mb-0'>{email}</small>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Tags',
    selector: 'teams',
    maxWidth: '150px',
    cell: row => renderTeams(row)
  },
  {
    name: 'Participation Status',
    selector: 'participation_status',
    sortable: true,
    sortFunction: statusSort,
    maxWidth: '210',
    cell: row => {
      const status = row.participation_status === false ? <Badge pill color='light-danger'>InActive</Badge> : row.participation_status === true ? <Badge pill color='light-success'>Active</Badge> : ""
      return status
    }
  },
  {
    name: 'Output Value',
    selector: 'output',
    sortable: true,
    maxWidth: '250px',
    cell: row => <span>{row.score ? `$${row.score.toLocaleString()}` : 'N/A'}</span>
  },
  {
    name: 'Output %',
    selector: 'percent',
    sortable: true,
    maxWidth: '250px',
    cell: row => renderOutputPercent(row)
  },
  // {
  //   name: 'Employee Link',
  //   selector: 'link',
  //   sortable: true,
  //   sortFunction: linkSort,
  //   maxWidth: '330px',
  //   cell: row => {
  //     const [copySuccess, setCopySuccess] = useState('')
  //     return (
  //       <>
  //         <input className='form-control bg-white text-center' disabled value={`${ENV.publicUrl}/iva/${row.link_key}`} /><Copy onClick={() => copyToClipborad(row, setCopySuccess)} size={20} className='ml-1 cursor-pointer' />
  //         {copySuccess !== '' && toast.dark(copySuccess, { 
  //           position: "top-right",
  //           toastId: "",
  //           autoClose: 2000,
  //           transition: Flip,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined 
  //           }) 
  //         }
  //       </>
  //     )
  //   } 
  // },
  {
    name: 'Action',
    selector: 'action',
    maxWidth: '100px',
    cell: row => renderDelete(row)
  }
]
