const initialState = {
    ratingObj: {},
    updatedScore: {}    
}
  
  const ratingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_RATING':
        return {
          ...state,
          ratingObj: action.payload
        }
      case 'GET_RATING_FAIL':
        return {
          ...state,
          ratingObj: {}
        }
      case 'UPDATE_SCORE':
        return {
          ...state,
          updatedScore: action.payload
      }
      case 'UPDATE_SCORE_FAIL':
        return {
          ...state,
          updatedScore: {}
      }
      default:
        return { ...state }
    }
  }
  export default ratingsReducer
  