const initialState = {
    questionValue: {},
    questionAuth:false,
    updatedQuestion: {}

  }
  
  const questionssReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_QUESTION':
        return {
          ...state,
          questionValue: action.payload,
          questionAuth:true
      }
      case 'BEFORE_QUESTION':
        return {
          ...state,
          questionAuth:false
      }
      case 'UPDATE_QUESTION':
        return {
          ...state,
          updatedQuestion: action.payload
      } 
      default:
        return { ...state }
    }
  }
  export default questionssReducer
  