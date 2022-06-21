const initialState = {
    allTeams: [],
    createdTeam: {},
    updatedTeam: {},
    deletedTeam: ''
  }
  
  const teamReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_TEAMS':
        return {
          ...state,
          allTeams: action.payload
      }
      case 'ADD_TEAM':
        return {
          ...state,
          createdTeam: action.payload
      }
      case 'EDIT_TEAM':
        return {
          ...state,
          updatedTeam: action.payload
      }
      case 'DELETE_TEAM':
        return {
          ...state,
          deletedTeam: action.payload
      }
      case 'TEAMS_FAIL':
        return {
          ...state,
          allTeams: []
      }
      default:
        return { ...state }
    }
  }
  export default teamReducer
  