const initialState = {
    usersList: [],
    teamsList: [],
    total: 1,
    params: {},
    allUsers: [],
    totalUsers: [],
    createdUser: {},
    currentUser: {},
    updatedUser: {},
    userByLink: {},
    auth_status: '',
    filteredScore: [],
    csvExport: [],
    bulkData: [],
    deletedUser:'',
    isActive: false
  }
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_USERS':
        return {
          ...state,
          totalUsers: action.totalUsers,
          usersList: action.payload,
          total: action.totalPages,
          params: action.params
      }
      case 'GET_ALL_USERS':
        return {
          ...state,
          allUsers: action.payload
      }
      case 'BULK_UPLOAD_USERS':
        return {
          ...state,
          bulkData: action.payload
      }
      case 'GET_FILTERED_SCORE':
        return {
          ...state,
          filteredScore: action.payload,
          csvExport: action.csvExport
      }
      case 'GET_TEAMS':
        return {
          ...state,
          teamsList: action.payload
      }
      case 'ADD_USER':
        return {
          ...state,
          createdUser: action.payload
      }
      case 'LOGIN':
        return {
          ...state,
          auth_status: action.payload
      }
      case 'EDIT_USER':
        return {
          ...state,
          updatedUser: action.payload
      }
      case 'GET_USER':
        return {
          ...state,
          userData: action.payload
      }
      case 'BULK_USERS':
        return {
          ...state,
          isActive: action.payload
      }
      case 'GET_USER_BY_LINK':
        return {
          ...state,
          userByLink: action.payload
      }
      case 'USER_FAIL_BY_LINK':
        return {
          ...state,
          userByLink: {}
      } 
      case 'USERS_FAIL':
        return {
          ...state,
          usersList: []
      }  
      case 'USERS_FAIL':
        return {
          ...state,
          usersList: []
      }  
      case 'FILTERED_SCORE_FAIL':
        return {
          ...state,
          filteredScore: []
      }
      case 'ALL_USERS_FAIL':
        return {
          ...state,
          allUsers: []
      }
      case 'TEAMS_FAIL':
        return {
          ...state,
          teamsList: []
      }
      case 'UPDATE_USER':
        return {
          ...state,
          currentUser: action.payload
        }
        case 'DELETE_USER':
          return {
            ...state,
            deletedUser: action.payload
        }
      default:
        return { ...state }
    }
  }
  export default userReducer
  