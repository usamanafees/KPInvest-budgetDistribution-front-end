import http from "../../services/httpService"
import { ENV } from '../../configs/appConfig'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const baseUrl = ENV.baseUrl
const endPoint = `${baseUrl}/rating`

// Get Ratings By Ids
export const getRatingById = (body) => {
    // console.log("Params ---->", params)
    return dispatch => {
      http.post(`${endPoint}`, body).then(response => {
        // console.log("response====> ", response.data.rating)
        dispatch({
          type: 'GET_RATING',
          payload: response.data.rating
        })
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response
          dispatch({
            type: "GET_RATING_FAIL",
            payload: data
          })
        }
      })
    }
}

// Update Score
export const updateScore = (body) => {
    // console.log("Params ---->", params)
    return dispatch  => {
      http.post(`${endPoint}/update_score`, body)
        .then(response => {
          // console.log("responseUser====> ", response.data.score)
          if (response.data.success === true) {
            dispatch({
              type: 'UPDATE_SCORE',
              payload: response.data.score
            })
            toast.success(response.data.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
          } else {
            console.log("errror in action", response.data.errorMessage)
            toast.error(response.data.me, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log("error here ===> ", error.response.data)
            const { errorMessage, message } = error.response.data
            toast.error(message, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
          }
        })
    }
  }