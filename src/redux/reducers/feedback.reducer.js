const initialState = {
    allComments: [],
    createdComment: {}    
}
  
  const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_ALL_COMMENTS':
        return {
          ...state,
          allComments: action.payload
        }
      case 'ALL_COMMENTS_FAIL':
        return {
          ...state,
          allComments: []
        }
      case 'SEND_FEEDBACK':
        return {
          ...state,
          createdComment: action.payload
      }
      case 'SEND_FEEDBACK_FAIL':
        return {
          ...state,
          feedback: {}
      }
      default:
        return { ...state }
    }
  }
  export default feedbackReducer
  