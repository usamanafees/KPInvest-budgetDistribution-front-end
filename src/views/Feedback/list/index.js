// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// Lodash Function
import _ from 'lodash'
// ** Table Columns
import { columns } from './columns'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Compass, Download, Save, PlusCircle } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Button, Label, Modal, ModalBody, Input, CustomInput, Row, Col, Card, CardBody } from 'reactstrap'
// ** Store & Actions
import { getAllComments } from '../../../redux/actions/feedback.action'

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
            <Label className='col-md-3' style={{ fontWeight: "bold" }} for='search-employee'>Search</Label>
            <Input
              id='search-employee'
              className=''
              type='text'
              value={q}
              onChange={e => handleFilter(e.target.value.replace(/[&\/\\,+()$~%.'":*?<>{}]/g, ""))}
              placeholder='Search Employee'
            />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export const FeedbackTable = () => {
  const dispatch = useDispatch()
  const props = useSelector(state => state.feedback)
  const allComments = props.allComments
  
  // Get All Comments
  useEffect(() => {
    dispatch(getAllComments())
  }, [dispatch, allComments.length])  

  // handle Filter
  const [q, setQ] = useState('')
  const handleFilter = val => {
    setQ(val)
  }

  const dataToRender = () => {
      const searchQuery = q.toLowerCase()
      const filtered = allComments.filter(el => {
        return el?.user?.firstName?.toLowerCase().match(new RegExp(searchQuery, 'g')) ||
        el?.user?.lastName?.toLowerCase().match(new RegExp(searchQuery, 'g')) ||
        el?.comment?.toLowerCase().match(new RegExp(searchQuery, 'g'))
      }) 

      return filtered
  }
  
  return (
    <Fragment>
      {/* Employees Table */}
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
        </Card>
      </div>
    </Fragment>
  )
}

export default FeedbackTable
