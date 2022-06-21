// ** React Imports
import moment from 'moment'
// ** Third Party Components
import {
  Edit,
  Copy
} from 'react-feather'

// ** Table columns
export const columns = [
  {
    name: 'First Name',
    maxWidth: '300px',
    selector: 'firstName',
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <h6 className='user-name text-truncate mb-0'>{row.user ? row.user.firstName : "Past"}</h6>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Last Name',
    maxWidth: '300px',
    selector: 'lastName',
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <h6 className='user-name text-truncate mb-0'>{row.user ? row.user.lastName : "User"}</h6>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Comment',
    selector: 'comment',
    maxWidth: '450px',
    cell: row => <span className='text-truncate mb-0' style={{whiteSpace: "normal", margin: "0px 0px"}}>{row?.comment}</span>
  },
  {
    name: 'Comment Date',
    selector: 'createdAt',
    maxWidth: '250px',
    cell: row => <span>{moment(row?.createdAt).local().format('MMM Do YYYY | hh:mm a ')}</span>
  }
]
