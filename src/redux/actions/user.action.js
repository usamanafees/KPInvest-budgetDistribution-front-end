import http from "../../services/httpService"
import { ENV } from '../../configs/appConfig'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const baseUrl = ENV.baseUrl
const endPoint = `${baseUrl}/user`

// Login
export const login = (body) => {
  return dispatch => {
    http.post(`${endPoint}/login`, body)
      .then(response => {
        if (response.data.success === true) {
          dispatch({
            type: 'LOGIN',
            payload: response.data.status
          })
          const email = response.data.email
          localStorage.setItem('jwtToken', response.data.token)
          localStorage.setItem('isAdmin', response.data.isAdmin)
          window.location = '/'
          return dispatch({          
            type: "UPDATE_USER",
            payload: response.data.user
          })
          
        } else {

          console.log("Error Logging In", response.data.errorMessage)
          toast.error(response.data.errorMessage, { position: toast.POSITION.TOP_CENTER, autoClose: 5000 })
        }
      })
      .catch((error) => {
        if (error.response) {
          const { errorMessage } = error.response.data
          toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER, autoClose: 5000 })
        }
      })
  }
}

export const refreshToken = () => {
  const storedToken = localStorage.getItem('jwtToken')
  
  return dispatch => {
    http.post(`${endPoint}/refreshToken`, {token: storedToken})
      .then(response => {
        if (response.data.success === true) {
          localStorage.setItem('jwtToken', response.data.token)
          localStorage.setItem('isAdmin', response.data.isAdmin)

          dispatch({          
            type: "UPDATE_USER",
            payload: response.data.user

          })

        } else {
          localStorage.removeItem('jwtToken')
          localStorage.removeItem('isAdmin')
          localStorage.clear()
          window.location = '/login'
          toast.error("Session expired, you must login again.", { position: toast.POSITION.TOP_CENTER, autoClose: 5000 })
        }
      })
      .catch((error) => {
        const { errorMessage } = error.response.data
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER, autoClose: 5000 })
      })
  }
}

//Reset Password Email Sendout
export const forgotPasswordEmail = (email) => {

  return dispatch => {
    http.post(`${endPoint}/requestPasswordReset`, { email })
      .then(response => {
        if (response.data.success === true) {
          toast.success("Check your email to reset your password.", { position: toast.POSITION.TOP_CENTER, autoClose: 15000 })
        } else {
          toast.success("Check your email to reset your password.123", { position: toast.POSITION.TOP_CENTER, autoClose: 15000 })
        }
      })
      .catch((error) => {
        const { errorMessage } = error.response.data
        toast.success("Check your email to reset your password.", { position: toast.POSITION.TOP_CENTER, autoClose: 15000 })
      })
  }
}

//Verify the token for resetting password
export const verifyResetToken = (token) => {

  return dispatch => {
    http.post(`${endPoint}/forgotPasswordVerify`, { token })
      .then(response => {
        if (response.data.success === true) {
          
        } else {
          window.location = '/login'
        }
      })
      .catch((error) => {
        const { errorMessage } = error.response.data
        console.log(errorMessage)
        window.location = '/login'
      })
  }
}

//Verify the token for resetting password
export const resetPassword = (password, token) => {

  return dispatch => {
    http.post(`${endPoint}/forgotPasswordSet`, { password, token })
      .then(response => {
        if (response.data.success === true) {
          toast.success("Password Reset Successfully! Redirecting to Login.", { position: toast.POSITION.TOP_CENTER, autoClose: 5000 })
          setTimeout(() => {
            window.location = "/login"
          }, 5000)
        } else {
          toast.error(response.data.message, { position: toast.POSITION.TOP_CENTER, autoClose: 5000 })
        }
      })
      .catch((error) => {
        const { errorMessage } = error.response.data
        console.log(errorMessage)
      })
  }
}

// ** Get users for pagination and search **
export const getUsers = (params) => {
  return dispatch => {
    http.post(`${endPoint}`, params).then(response => {
      dispatch({
        type: 'GET_USERS',
        payload: response.data.pagedData,
        totalUsers: response.data.users,
        totalPages: response.data.total,
        params
      })
    })
    .catch((error) => {
      if (error.response) {
        const { data } = error.response
        dispatch({
          type: "USERS_FAIL",
          payload: data
        })
      }
    })
  }
}

// Get All Users
export const getAllUsers = () => {
  return dispatch => {
    http.get(`${endPoint}`).then(response => {
      dispatch({
        type: 'GET_ALL_USERS',
        payload: response.data.users
      })
    })
    .catch((error) => {
      if (error.response) {
        const { data } = error.response
        dispatch({
          type: "ALL_USERS_FAIL",
          payload: data
        })
      }
    })
  }
}

// Get getFilteredScore
export const getFilteredScore = (body) => {
  return dispatch => {
    http.post(`${endPoint}/filtered_score`, body).then(response => {
      dispatch({
        type: 'GET_FILTERED_SCORE',
        payload: response.data.data.filteredUsers,
        csvExport: response.data.data.export_csv
      })
    })
    .catch((error) => {
      if (error.response) {
        const { data } = error.response
        dispatch({
          type: "FILTERED_SCORE_FAIL",
          payload: data
        })
      }
    })
  }
}

// ** Get User By Id **
export const getUserbyId = (userId) => {
  return dispatch => {
    http.get(`${endPoint}/${userId}`).then(response => {
      dispatch({
        type: 'GET_USER',
        payload: response.data.user
      })
    })
    .catch((error) => {
      if (error.response) {
        const { errorMessage } = error.response.data
        dispatch({
          type: "USER_FAIL",
          payload: errorMessage
        })
        toast.error(errorMessage, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })

      }
    })
  }
}


// Add User
export const addUser = (body) => {
  return dispatch => {
    http.post(`${endPoint}/addUser`, body)
      .then(response => {
        if (response.data.success === true) {
          dispatch({
            type: 'ADD_USER',
            payload: response.data.user
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

// Eidt User
export const editUser = (userId, body) => {
  return dispatch => {
    http.put(`${endPoint}/updateUser/${userId}`, body)
      .then(response => {
        if (response.data.success === true) {
          dispatch({
            type: 'EDIT_USER',
            payload: response.data.updatedUser
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

// bulkUpdate
// Eidt User
export const bulkUpdateUsers = (body) => {
  return dispatch => {
    http.post(`${endPoint}/bulkUpdate`, body)
      .then(response => {
        if (response.data.success === true) {
          dispatch({
            type: 'BULK_USERS',
            payload: response.data.isActive
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

// Bulk Upload Users
export const bulkUpload = (body) => {
  return dispatch => {
    http.post(`${endPoint}/bulkaddUsers`, body)
      .then(response => {
        if (response.data.success === true) {
          dispatch({
            type: 'BULK_UPLOAD_USERS',
            payload: response.data.users
          })
          toast.success(response.data.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
        } else {
          console.log("errror in action", response.data.message)
          toast.error(response.data.message, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log("error here ===> ", error.response.data)
          const { message } = error.response.data
          toast.error(message, { position: toast.POSITION.TOP_RIGHT, autoClose: 5000 })
        }
      })
  }
}

// Get Teams
export const getTeams = () => {
  return dispatch => {
    http.get(`${baseUrl}/teams`).then(response => {
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
export const deleteUser = (uid) => {
  return dispatch => {
    http.delete(`${endPoint}/${uid}`)
      .then(response => {
        if (response.data.success === true) {
          dispatch({
            type: 'DELETE_USER',
            payload: 'user_deleted'
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
export const clearDelUserProp = () => {
  return dispatch => {
    dispatch({
      type: 'DELETE_USER',
      payload: ''
    })
  }
}

// Logout
export const Logout = () => {
  localStorage.removeItem('jwt')
  localStorage.clear()
  window.location = '/login'
}

