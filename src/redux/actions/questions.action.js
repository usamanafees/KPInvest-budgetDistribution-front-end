import http from "../../services/httpService"
import { ENV } from '../../configs/appConfig'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const baseUrl = ENV.baseUrl
const endPoint = `${baseUrl}/questions`

export const beforQuestion = () => {
    return dispatch => {
        dispatch({
            type: 'BEFORE_QUESTION'
        })
    }
}
// ** Get Bonus By Id **
export const getQuestion = () => {
    return dispatch => {
      http.get(`${endPoint}/`).then(response => {
        dispatch({
          type: 'GET_QUESTION',
          payload: response.data.data
        })
      })
      .catch((error) => {
        if (error.response) {
          const { errorMessage } = error.response.data
        //   dispatch({
        //     type: "BONUS_FAIL",
        //     payload: errorMessage
        //   })
         toast.error(errorMessage, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
  
        }
      })
    }
}

// Update Bonus Value
export const editQuestion = (Id, body) => {
    return dispatch => {
      http.put(`${endPoint}/editQuestion/${Id}`, body)
        .then(response => {
          if (response.data.success === true) {
            dispatch({
              type: 'UPDATE_QUESTION',
              payload: response.data.data
            })
            toast.success(response.data.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
          } else {
            toast.error(response.data.error, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
          }
        })
        .catch((error) => {
          if (error.response) {
            const { errorMessage } = error.response.data
            toast.error(errorMessage, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
          }
        })
    }
  }