import http from "../../services/httpService"
import { ENV } from '../../configs/appConfig'
import CryptoJS from 'crypto-js'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const baseUrl = ENV.baseUrl
const endPoint = `${baseUrl}/teams`

// Get Teams
export const getAllTeams = () => {
    return dispatch => {
      http.get(`${endPoint}`).then(response => {
        dispatch({
          type: 'GET_TEAMS',
          payload: response.data.teams
        })
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response
          dispatch({
            type: "TEAMS_FAIL",
            payload: data
          })
        }
      })
    }
}

// Add Team
export const addTeam = (body) => {
    return dispatch => {
      http.post(`${endPoint}/addTeam`, body)
        .then(response => {
          if (response.data.success === true) {
            dispatch({
              type: 'ADD_TEAM',
              payload: response.data.team
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

// Eidt Team
export const editTeam = (teamId, body) => {
    return dispatch => {
      http.put(`${endPoint}/updateTeam/${teamId}`, body)
        .then(response => {
          if (response.data.success === true) {
            dispatch({
              type: 'EDIT_TEAM',
              payload: response.data.updatedTeam
            })
            toast.success(response.data.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
          } else {
            console.log("errror in action", response.data.errorMessage)
            toast.error(response.data.errorMessage, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
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

// Delete team
export const deleteTeam = (teamId) => {
    return dispatch => {
      http.delete(`${endPoint}/deleteTeam/${teamId}`)
        .then(response => {
          if (response.data.success === true) {
            dispatch({
              type: 'DELETE_TEAM',
              payload: 'team_deleted'
            })
            toast.success(response.data.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
          } else {
            console.log("errror in action", response.data.errorMessage)
            toast.error(response.data.errorMessage, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
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

export const clearDelTeamProp = () => {
    return dispatch => {
      dispatch({
        type: 'DELETE_TEAM',
        payload: ''
      })
    }
}