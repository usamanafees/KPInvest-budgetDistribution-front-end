// ** React Imports
import { useState, useEffect, Fragment } from 'react'
// ** Redux Imports
import { useDispatch, useSelector } from 'react-redux'
import { FormGroup, CustomInput } from 'reactstrap'
// ** Store & Actions
import { editUser, getAllUsers } from '../../../redux/actions/user.action'

const manageUser = row => {
  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState(row.isActive)
  
  const handleIsActive = e => {
    const teamArr = []
    row.teams.forEach(el => {
      teamArr.push(el.id)
    })
    if (isActive === true) {
      setIsActive(false)
      const user = { 
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        teams: teamArr,
        isActive: false 
      }
      dispatch(editUser(row.id, user))
    } else if (isActive === false) {
      setIsActive(true)
      const user = { 
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        teams: teamArr,  
        isActive: true
      }
      dispatch(editUser(row.id, user))
    }
    history.go('/settings')
  }
  return (
    <div>
      <FormGroup>
        <CustomInput type='switch' id={row.id} defaultValue={row.isActive} value={isActive} name='isActive' checked={isActive} onChange={(e) => handleIsActive(e)} />
      </FormGroup>
    </div>
  )

}

// ** Table columns
export const columns = [
  {
    name: 'First Name',
    maxWidth: '400px',
    selector: 'firstName',
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            {/* <p className='user-name text-truncate mb-0'>{fullName}</p> */}
            <h6 className='user-name text-truncate mb-0'>{row.firstName}</h6>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Last Name',
    maxWidth: '400px',
    selector: 'lastName',
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            {/* <p className='user-name text-truncate mb-0'>{fullName}</p> */}
            <h6 className='user-name text-truncate mb-0'>{row.lastName}</h6>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Email Address',
    maxWidth: '500px',
    selector: 'email',
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            {/* <p className='user-name text-truncate mb-0'>{fullName}</p> */}
            <h6 className='user-name text-truncate mb-0'>{row.email}</h6>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Active / Disabled',
    selector: 'isActive',
    cell: row => manageUser(row)
  }
]
