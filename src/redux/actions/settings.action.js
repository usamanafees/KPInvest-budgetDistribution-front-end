import http from "../../services/httpService"
import { ENV } from '../../configs/appConfig'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const baseUrl = ENV.baseUrl
const endPoint = `${baseUrl}/settings`

// ** Get Bonus By Id **
export const getBonusbyId = (Id) => {
    return dispatch => {
      http.get(`${endPoint}/bonus_pool/${Id}`).then(response => {
        dispatch({
          type: 'GET_BONUS_VALUE',
          payload: response.data.data
        })
      })
      .catch((error) => {
        if (error.response) {
          const { errorMessage } = error.response.data
          dispatch({
            type: "BONUS_FAIL",
            payload: errorMessage
          })
          toast.error(errorMessage, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
  
        }
      })
    }
}

// Update Bonus Value
export const updateBonus = (Id, body) => {
    return dispatch => {
      http.put(`${endPoint}/update_bonus/${Id}`, body)
        .then(response => {
          if (response.data.success === true) {
            dispatch({
              type: 'UPDATE_BONUS_VALUE',
              payload: response.data.updatedBonus
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