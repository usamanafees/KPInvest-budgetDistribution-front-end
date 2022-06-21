const initialState = {
    bonusValue: {},
    updatedBonus: {}
  }
  
  const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_BONUS_VALUE':
        return {
          ...state,
          bonusValue: action.payload
      }
      case 'UPDATE_BONUS_VALUE':
        return {
          ...state,
          updatedBonus: action.payload
      } 
      case 'BONUS_FAIL':
        return {
          ...state,
          bonusValue: {}
      }
      default:
        return { ...state }
    }
  }
  export default settingsReducer
  