// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// Lodash Function
import _ from 'lodash'
// Bar Chart
import BarChart from '../ChartjsBarChart'
// ** Table Columns
import { columns } from './columns'
import { ModalComponent } from './modal'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { CSVLink, CSVDownload } from "react-csv"
import Select from 'react-select'
import { ChevronDown, Compass, Download, Save, PlusCircle, DownloadCloud, Upload, X } from 'react-feather'
import DataTable from 'react-data-table-component'
import {OutTable, ExcelRenderer} from 'react-excel-renderer'
// import DataTableExtensions from 'react-data-table-component-extensions'
// import 'react-data-table-component-extensions/dist/index.css'
import { Button, Label, Modal, ModalBody, ModalHeader, Input, CustomInput, Row, Col, Card, CardBody } from 'reactstrap'
// ** Store & Actions
import { getUsers, getTeams, getAllUsers, bulkUpload, getFilteredScore, clearDelUserProp } from '../../../redux/actions/user.action'
import { getBonusbyId, updateBonus } from '../../../redux/actions/settings.action'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { toast } from 'react-toastify'

const CustomHeader = ({ Teams, teamData, handleTeam, csvData, headers, handleFilter, value, handlePerPage, rowsPerPage }) => {
  return (
    <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        {/* Select Per Page*/}
        {/* <Col lg='2' sm="6" className='d-flex align-items-center px-0 px-lg-1'>
          <div className='d-flex align-items-center mr-2'>
            <Label for='rows-per-page'>Show</Label>
            <CustomInput
              className='form-control ml-50 pr-3'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </CustomInput>
          </div>
        </Col> */}
        {/* Filter from tags react select */}
        {/* <Col lg="1" md="1" sm="1">
          <CSVLink 
            data={csvData}
            title='Export CSV' 
            filename={"employees.csv"}
            target="_blank"
          >
            <DownloadCloud size='20' className="mt-1 cursor-pointer" />
          </CSVLink>
          </Col> */}
        <Col lg='9' md="10" sm="12" className='mt-lg-0 mt-1 pr-lg-1 p-0'>
            <div className='col-12 d-flex'>
              <span className='col-md-2 d-flex align-items-center' style={{ fontWeight: 500 }} >Tags</span>
              <Select
                    name="Teams"
                    className='col-md-9'
                    isMulti
                    value={Teams}
                    onChange={handleTeam}
                    options={teamData}
                    closeMenuOnSelect={true}
                    isClearable
                />
            </div>  
        </Col>
        {/* Search from table */}
        <Col lg='3' sm="12" className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0'>
          <div className='d-flex align-items-center'>
            <Label for='search-employee'>Search</Label>
            <Input
              id='search-employee'
              className='ml-50 mr-2 w-100'
              type='text'
              value={value}
              onChange={e => handleFilter(e.target.value)}
              placeholder='Search Employee'
            />
          </div>

          {/* <Input className='w-auto ' type='select' value={statusValue} onChange={handleStatusValue}>
            <option value=''>Filter By</option>
            <option value='downloaded'>Name</option>
            <option value='draft'>Status</option>
            <option value='paid'>Paid</option>
            <option value='partial payment'>Partial Payment</option>
            <option value='past due'>Past Due</option>
            <option value='partial payment'>Partial Payment</option>
          </Input> */}
        </Col>
      </Row>
    </div>
  )
}

const ContributionTable = () => {
  const dispatch = useDispatch()
  const props = useSelector(state => state.users)
  const bonusPool = useSelector(state => state.settings)

// delete on rerender

  const deletedUser = props.deletedUser
  // Chart Vars
  const primaryColorShade = 'rgba(51, 102, 255, 0.75)',
  labelColor = '#6e6b7b',
  tooltipShadow = 'rgba(0, 0, 0, 0.25)',
  gridLineColor = 'rgba(200, 200, 200, 0.2)'
  // Settings States
  const bonusValue = bonusPool.bonusValue
  const updatedBonus = bonusPool.updatedBonus
  const [bonus, setBonus] = useState('')
  // file renderer
  const [rows, setRows] = useState()
  const [cols, setCols] = useState([])
  // Get bonus pool value by id
  useEffect(() => {
    dispatch(getBonusbyId(1))
    setBonus(bonusValue.org_bonus_pool)
  }, [dispatch, bonusValue.org_bonus_pool])  
  
  // props from users reducer
  const users = props.usersList
  const updatedUser = props.updatedUser
  const createdUser = props.createdUser
  const bulkData = props.bulkData
  const totalUsers = props.totalUsers
  const filteredScore = props.filteredScore
  const csvExport = props.csvExport
  const teams = props.teamsList
 
// Value State
  const [value, setValue] = useState('')
  // States for pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [statusValue, setStatusValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [filteredUsers, setFilteredUsers] = useState([])
  // States for tags fitration
  const [Teams, setTeams] = useState(null)
  const teamData = []
  if (teams.length > 0) {
      teams.forEach(element => {
          const teams = { value: element.id, label: element.teamName }
          teamData.push(teams)
      })
  }
  
  
  // Modal open State
  const [modal, setModal] = useState(false)
  // Model for upload users
  const [modalUpload, setModalUpload] = useState(false)
  const toggleUpload = () => setModalUpload(!modalUpload)
  // Toggle for Modal
  const toggle = () => setModal(!modal)

  // get users and allUsers when user added, updated and score updated
  useEffect(() => {
    dispatch(
      getUsers({
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue,
        q: value
      })
    )

  dispatch(clearDelUserProp())


    // Updated user Obj
    if (!_.isEmpty(updatedUser)) {
      const userId = updatedUser.id
      let updated
      for (let i = 0; i < users.length; i++) {
        const element = users[i]
        if (element.id === userId) {
          updated = Object.assign(element, updatedUser)
        }
      }
      users.push(updated)
      
      let updatedAll
      for (let j = 0; j < totalUsers.length; j++) {
        const elem = totalUsers[j]
        if (elem.id === userId) {
          updatedAll = Object.assign(elem, updatedUser)
        }
      }
      totalUsers.push(updatedAll)
    }
    // New added Object
    if (!_.isEmpty(createdUser)) {
      users.push(createdUser)
      totalUsers.push(createdUser)
    }
    
  }, [dispatch, updatedUser, createdUser, updatedBonus, bulkData.length > 0, deletedUser])

  // get all teams
  useEffect(() => {
    dispatch(getTeams())
    setTeams(teamData)
  }, [dispatch, teams.length])  

  // Update bonus pool value
  const updateBonusPool = (e) => {
    const data = { org_bonus_pool: bonus }
    dispatch(updateBonus(1, data))
    dispatch(
      getUsers({
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue,
        q: value
      })
    )
    e.preventDefault()
  }

  const handleBonusInput = (value) => {
    const val = value.replace(/[^0-9]/g, '')
    setBonus(val)
  }

  // get paginated users
  useEffect(() => {
    dispatch(
      getUsers({
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue,
        q: value
      })
    )
  }, [dispatch, users.length])

  // function for search query parameter
  const handleFilter = val => {
    setValue(val)
    dispatch(
      getUsers({
        page: currentPage,
        perPage: rowsPerPage,
        status: statusValue,
        q: val
      })
    )
  }

  // handle show per page rows limit
  const handlePerPage = e => {
    dispatch(
      getUsers({
        page: currentPage,
        perPage: parseInt(e.target.value),
        status: statusValue,
        q: value
      })
    )
    setRowsPerPage(parseInt(e.target.value))
  }

  // handle status
  const handleStatusValue = e => {
    setStatusValue(e.target.value)
    dispatch(
      getUsers({
        page: currentPage,
        perPage: rowsPerPage,
        status: e.target.value,
        q: value
      })
    )
  }

  //  handle pagination
  const handlePagination = page => {
    dispatch(
      getUsers({
        page: page.selected + 1,
        perPage: rowsPerPage,
        status: statusValue,
        q: value
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // custom paginations
  const CustomPagination = () => {
    const count = Number((props.total / rowsPerPage).toFixed(0))
    return (
      <>
      {/* buttons */}
      <div className='invoice-list-table-header w-100 py-2'>
      <Row>
        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
          {/* <Button.Ripple onClick={toggle} className="ml-2" color='primary'>
            <PlusCircle size={17} /> &nbsp; Add Employee
          </Button.Ripple>
          
          <Button.Ripple disabled className="ml-2" tag={Link} to='/' color='outline-secondary'>
            <Download size={17} /> &nbsp; Import CSV
          </Button.Ripple>
          <Button.Ripple disabled className="ml-2" tag={Link} to='/' color='outline-secondary'>
            <Compass size={17} /> &nbsp; Connect Namely API
          </Button.Ripple> */}
        </Col>
        
        <Col lg='6' className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0'>
          {/* pagination */}
          {/* <ReactPaginate
            pageCount={count || 1}
            nextLabel=''
            breakLabel='...'
            previousLabel=''
            activeClassName='active'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            forcePage={currentPage !== 0 ? currentPage - 1 : 0}
            onPageChange={page => handlePagination(page)}
            pageClassName={'page-item'}
            nextLinkClassName={'page-link'}
            nextClassName={'page-item next'}
            previousClassName={'page-item prev'}
            previousLinkClassName={'page-link'}
            pageLinkClassName={'page-link'}
            containerClassName={'pagination react-paginate justify-content-end p-1'}
          /> */}
        </Col>
      </Row>
    </div>
      
      </>
    )
  }

  const handleSubmit = (e) => {
    const arr = []
      rows.forEach((el) => {
        const obj = {
          firstName: el[0],
          lastName: el[1],
          email: el[2],
          teams: [el[3], el[4], el[5], el[6]]
        }
        arr.push(obj)
      })
    const unique = arr.filter((v, i) => {
      return (
        arr.map((val) => val.email).indexOf(v.email) === i
      )
    })

    const null_mail = unique.some(el => el.email === undefined)
    const null_first = unique.some(el => el.firstName === undefined)
    const null_last = unique.some(el => el.lastName === undefined)
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const invalid_email = unique.some(el => reg.test(el.email) === false)

    if (null_mail === true || null_first === true || null_last === true || invalid_email === true) {
      if (null_mail === true) {
        toast.error('Missing Email in some row', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
      }
      if (null_first === true) {
        toast.error('Missing First Name in some row', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
      }
      if (null_last === true) {
        toast.error('Missing Last Name in some row', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
      }
      if (invalid_email === true) {
        toast.error('Invalid email format in some row', { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
      }
    } else {   
      dispatch(bulkUpload({ users: unique }))
      toggleUpload() 
    }
  }

  const fileHandler = (event) => {
    const fileObj = event.target.files[0]
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err)           
      } else {
        resp.rows.splice(0, 1)
        const finalList = resp.rows.filter(el => el.length)
        if (finalList.length === 0) {
          toast.error("Empty file can't be upload!", { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
        }
        setRows(finalList)
        setCols(resp.cols)
      }
    })               
  }

  const dataToRender = () => {
    // All filtrations for search and paginations
    const filters = {
      status: statusValue,
      q: value
    }
    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    // filter users on teams tags
    const filtered = []
    for (const user in totalUsers) {
      const teams = totalUsers[user].teams
      for (const team in teams) {
          for (const filter in Teams) {
              if (teams[team].id === Teams[filter].value) {
                  filtered.push(totalUsers[user])
              }
          }
      }
    }

    // Get unique data from above array
    const uniqueArr = filtered.filter((v, i, a) => a.findIndex(t => (t.id === v.id && t.email === v.email)) === i)
    if (uniqueArr.length > 0) {
      if (filteredScore.length > 0) {
        return filteredScore
      }
      return uniqueArr
    } else if (uniqueArr.length === 0) {
      return []
    } else {
      return totalUsers
    }

    // For pagination data
    // if (users.length > 0) {
    //   return users
    // } else if (users.length === 0 && isFiltered) {
    //   return []
    // } else {
    //   return totalUsers.slice(0, rowsPerPage)
    // }
  }
 
  // push filtered data to this new array
  const filteredArr = []
  dataToRender().map(el => {
    filteredArr.push(el)
  })


  // Handle teams data
  const handleTeam = (e) => {
    console.log("eeeeee asfaudfsuyas iagsdiyagsyid ====>", e)
    if (e && e.length > 0) {
        setTeams(e)
    } else {
        setTeams(teamData)
    }
    const teamsArr = []
    const filtered = []
    e.map((el) => {
      teamsArr.push(el.value)
      for (const user in totalUsers) {
        const teams = totalUsers[user].teams
        for (const team in teams) {
            for (const filter in e) {
                if (teams[team].id === e[filter].value) {
                    filtered.push(totalUsers[user])
                }
            }
        }
      }  
    })
    // Get unique data from above array
    const uniqueArr = filtered.filter((v, i, a) => a.findIndex(t => (t.id === v.id && t.email === v.email)) === i)
    dispatch(getFilteredScore({ filtered: teamsArr, filteredUsers: uniqueArr, check: '' }))
  }

  // set filteredArray in state
  useEffect(() => {
    setFilteredUsers(filteredArr)
    const teamsArr = []
    teams.map(el => {
      teamsArr.push(el.id)
    })
    // console.log('teamsArrrrrr=====>', teamsArr, Teams)
    if (teams.length > 0 && (Teams && Teams.length === teams.length)) {
      dispatch(getFilteredScore({ filtered: teamsArr, filteredUsers: [], check: 'firstRender' }))
    }
  }, [dispatch, filteredArr.length])

  // total score for output value percent
  let totalScore = 0
  totalUsers.map(el => {
    totalScore += el.score
  })
  // make data for csv export
  // const csvData = [] 
  // filteredArr.map(el => {
  //   const obj = { 
  //     Employee: `${el.firstName} ${el.lastName}`, 
  //     Email: el.email,
  //     Employee_Link: el.link_key,
  //     Participation_Status: (el.participation_status === true) ? 'Active' : 'InActive',
  //     Output_Value: el.score,
  //     Output_Percent: el.score ? `${((el.score / totalScore) * 100).toFixed(4)} %` : `0 %`
  //   }
  //   csvData.push(obj)
  // })

  // console.log('rows state-===>', rows, 'cols state', cols)
  return (
    <Fragment>
      {/* Employees Table */}
      <div className='invoice-list-wrapper'>
        <Card>
          <div className='invoice-list-dataTable'>
            {/* Data Table */}
            <DataTable
              noHeader
              pagination
              subHeader={true}
              columns={columns}
              responsive={true}
              sortIcon={<ChevronDown />}
              className='react-dataTable'
              // paginationServer
              // paginationDefaultPage={currentPage}
              // paginationComponent={CustomPagination}
              data={dataToRender()}
              subHeaderComponent={
                <CustomHeader
                  value={value}
                  statusValue={statusValue}
                  csvData={csvExport}
                  rowsPerPage={rowsPerPage}
                  handleFilter={handleFilter}
                  handlePerPage={handlePerPage}
                  handleTeam={handleTeam}
                  teamData={teamData}
                  Teams={Teams}
                />
              }
            />
            {/* Bottom Button Create Employee */}
          </div>
          <Row className='mb-2'>
            <Col lg='8' className='d-flex align-items-center px-0 px-lg-1'>
              <Button.Ripple onClick={toggle} className="ml-2" color='primary'>
                <PlusCircle size={17} /> &nbsp; Add Employee
              </Button.Ripple>
              {/* <CSVLink 
                data={csvExport}
                title='Export CSV' 
                filename={"employees.csv"}
                target="_blank"
              >
                <Button.Ripple className="ml-2" color='primary'>
                  <Download size={17} className="cursor-pointer" /> Export CSV
                </Button.Ripple>
              </CSVLink> */}
              <Button.Ripple onClick={toggleUpload} className="ml-2" color='outline-secondary'>
                <Upload size={17} /> &nbsp; Import CSV
              </Button.Ripple>
              {/* Model for Bulk Upload */}
              <Modal isOpen={modalUpload}
                style={{ 
                    marginTop: 250,
                    maxWidth: 500
                }}
                toggle={toggleUpload}
                backdrop="static">
                  <div className="m-2">
                      <Row>
                          <Col sm="10" lg="10">
                              <h3 style={{ fontWeight: 600, color: "black" }}>
                                Bulk Upload Employees
                              </h3> 
                          </Col>
                          <Col sm="2" lg="2">
                              <X onClick={toggleUpload} className='cursor-pointer' size={20} />
                          </Col>
                      </Row>
                  </div>
                    <ModalBody className="m-2">
                      <Row>
                        <input
                          type='file'
                          accept='.csv'
                          className='form-control cursor-pointer col-8 bg-warning'
                          id='csvFile'
                          // onChange={(e) => setCsvFile(e.target.files[0])}
                          onChange={(e) => fileHandler(e)}
                        />
                        <div className='col-1'></div>
                        <button disabled={!rows} onClick={() => handleSubmit()} className='btn btn-primary btn-sm col-3'>Upload</button>
                      </Row>
                    </ModalBody>
              </Modal>
              <Button.Ripple disabled className="ml-2" tag={Link} to='/' color='outline-secondary'>
                <Compass size={17} /> &nbsp; Connect Namely API
              </Button.Ripple>
            </Col>
            <Col lg='4' className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pr-lg-1 p-0'>
            </Col>
          </Row>
        </Card>
        {/* Modal For Add Employee */}
        <ModalComponent modal={modal} users={users} totalUsers={totalUsers} teams={teams} toggle={toggle} />
      </div>
      {/* Row for Bonus Pool Value and Bar Chart */}
      <Row className='match-height'>
         <Col lg='3' sm='6'>
           <Card>
             {/* <CardHeader className="m-2"> */}
             {/* </CardHeader> */}
             <CardBody className="m-2">
               <div className='mb-2'>
                 <h3 style={{ fontWeight: 600 }}>Organization Bonus Pool</h3>
               </div>
               <div>
                 <span>Total Organization Bonus Pool <br /></span>
                 <small className=''>Enter a dollar amount below.</small>
               </div>
               <Input className="mt-1" type="text" name="org_bonus_pool" value={`$${bonus?.toString()?.split(/(?=(?:...)*$)/)?.join(',')}`} onChange={(e) => handleBonusInput(e.target.value)} />
               <Button.Ripple className="mt-1" disabled={bonus === ""} onClick={(e) => updateBonusPool(e)} color='primary'>
                 <Save size={17} /> &nbsp; Save 
               </Button.Ripple>
             </CardBody>
           </Card>
         </Col>
         <Col lg="9" sm="12">
             <BarChart
                 primaryColorShade={primaryColorShade}
                 labelColor={labelColor}
                 tooltipShadow={tooltipShadow}
                 gridLineColor={gridLineColor}
                 filteredArr={filteredArr}
                //  Teams={Teams}
             />
         </Col>
       </Row>
    </Fragment>
  )
}

export default ContributionTable
