// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { X, RefreshCcw, RefreshCw, Save } from 'react-feather'
import { Input, Button, Row, Col, Modal, ModalBody, Badge, ModalHeader} from 'reactstrap'
import { toast } from 'react-toastify'
// To get id from from url
import { useHistory, useParams } from "react-router-dom"
// ** Store & Actions
import { updateScore, getRatingById } from '../../redux/actions/ratings.action'
import { getAllUsers } from '../../redux/actions/user.action'
import Nouislider from 'nouislider-react'

let current
let applied
const renderScore = row => {
  const params = useParams()
  const dispatch = useDispatch()
  const props = useSelector(state => state.users)
  const ratingProps = useSelector(state => state.ratings)
  const count = localStorage.getItem('pageCount')
  //props
  const userData = props.currentUser
  const ratingObj = ratingProps.ratingObj
  const updatedScore = ratingProps.updatedScore.updatedScore
  const updatedUser = ratingProps.updatedScore.updatedUser
  const userId = userData.id
  const rowId = row.id
  
  // States
  const [score, setScore] = useState()
  const [oldScore, setOldScore] = useState()
  const [appliedState, setApplied] = useState()
  const [ratingState, setRatingState] = useState({})
  
  // Assign score to current
  current = score
  applied = appliedState
  // Get user object by link

  useEffect(() => {
    if (ratingObj.ratingTo === rowId) {
      setRatingState(ratingObj)
      setApplied(ratingObj.appliedPercent)
      setScore(ratingObj.score)
      setOldScore(ratingObj.score)
    }
  }, [ratingObj])

  useEffect(() => {
    const body = {
      rating_from: userId,
      rating_to: rowId
    }
    dispatch(getRatingById(body))
  }, [dispatch])

  // For getting updated rating Object 
  useEffect(() => {
    const body = {
      rating_from: userId,
      rating_to: rowId
    }
    dispatch(getRatingById(body))
    Object.assign(ratingObj, updatedScore)
    // for update current value in table
    dispatch(getAllUsers())
    
  }, [dispatch, updatedScore])

  const handleSubmit = (e) => {
    if (score <= 1000 && score >= 0 && score !== ratingState.score) {
    setTimeout(() => {
       const rating = {
            score: (score === '' || score === 0) ? 0 : score,
            ratingFrom: userId,
            ratingTo: rowId
          }
        dispatch(updateScore(rating))
        current = score
        applied = ratingState.appliedPercent
      }, 2000)
    }
  }  

  const handleScore = (e) => {
    const score = e[0]
    const logScore = Math.round(Math.pow(score, 2.5) / 100)

    setScore(logScore)
  }

  return (
    <>
      {/* <Input className="col-3" type="number" value={score} onChange={handleScore} /> */}
      <Nouislider
        range={{ min: 0, max: 100 }}
        start={[Math.round(Math.pow(score * 100, 1 / 2.5)) || 0]}
        onChange={handleScore}
        style={{width: "100px"}}
        connect="lower"
        tooltips={[true]}
        animate={true}
    />
      {oldScore !== score ? 
        <Button.Ripple size="sm" className="ml-1" color='primary' onClick={(e) => handleSubmit(e)}>
          <Save size={12}/>
        </Button.Ripple>
        :
        null
      }

      {(score > 1000 || score < 0) &&
       toast.error("Score doesn't Save, It can't be more than 1000 or less than 0", { toastId: "", position: toast.POSITION.TOP_RIGHT, autoClose: 2000 })
      }
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

const scoreSort = (rowA, rowB) => {
  const a = rowA.score
  const b = rowB.score

  if (a > b) {
    return 1
  }

  if (b > a) {
    return -1
  }

  return 0
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
          <ModalHeader className="m-2">
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
          </ModalHeader>
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

// ** Table columns
export const columns = [
  {
    name: 'Employee',
    maxWidth: '300px',
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
    maxWidth: '350px',
    cell: row => renderTeams(row)
  },
  {
    name: 'Score',
    selector: 'score',
    maxWidth: '350px',
    sortable: true,
    sortFunction: scoreSort, 
    cell: row => renderScore(row)
  },
  {
    name: 'Current',
    selector: 'current',
    maxWidth: '180px',
    cell: row => <span>{current ? current : 0}</span>
  },
  {
    name: 'Applied %',
    selector: 'applied',
    sortable: true,
    maxWidth: '180px',
    cell: row => <span>{applied ? `${applied.toFixed(4)} %` : `0 %`}</span>
  }
]
