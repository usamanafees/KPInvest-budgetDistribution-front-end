// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import users from './users.reducer'
import settings from './settings.reducer'
import feedback from './feedback.reducer'
import ratings from './ratings.reducer'
import teams from './teams.reducer'
import questions from './questions.reducer'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  users,
  settings,
  feedback,
  ratings,
  teams,
  questions
})

export default rootReducer
