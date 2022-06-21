import http from "../../services/httpService"
import { ENV } from '../../configs/appConfig'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const baseUrl = ENV.baseUrl
const endPoint = `${baseUrl}/feedback`

// Get All Comments
export const getAllComments = () => {
    return dispatch => {
      http.get(`${endPoint}`).then(response => {
        dispatch({
          type: 'GET_ALL_COMMENTS',
          payload: response.data.comments
        })
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response
          dispatch({
            type: "ALL_COMMENTS_FAIL",
            payload: data
          })
        }
      })
    }
}

// Send Feedback
export const sendFeedback = (body) => {
    return dispatch => {
      http.post(`${endPoint}/sendFeedback`, body)
        .then(response => {
          if (response.data.success === true) {
            dispatch({
              type: 'SEND_FEEDBACK',
              payload: response.data.feedback
            })
            toast.success(response.data.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
          } else {
            console.log("errror in action", response.data.error)
            toast.error(response.data.error, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log("error here ===> ", error.response.data)
            const { errorMessage } = error.response.data
            toast.error(errorMessage, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
          }
        })
    }
  }