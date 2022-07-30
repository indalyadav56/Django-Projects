// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import users from '@src/views/UserManagement/store/reducer'
import roles from '@src/views/RoleManagement/store/reducer'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  roles,
  users
})

export default rootReducer