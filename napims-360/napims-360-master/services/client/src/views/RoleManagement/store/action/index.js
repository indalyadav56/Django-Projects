import axios from 'axios'
import roles from '../tempData'
// ** Get all Data
export const getAllData = () => {
  return async dispatch => {
    // await axios.get('/api/auth/roles/all-data').then(response => {
      dispatch({
        type: 'GET_ALL_DATA',
        data: { data: roles }
      })
    // })
  }
}

// ** Get data on page or row change
export const getData = params => {
  return async dispatch => {
    // await axios.get('/api/auth/roles', params).then(response => {
      dispatch({
        type: 'GET_DATA',
        data: roles,
        totalPages: 10,
        params
      })
    // })
  }
}

// ** Get User
export const getRole = id => {
  return async dispatch => {
    await axios
      .get('/api/auth/roles', { id })
      .then(response => {
        dispatch({
          type: 'GET_USER',
          selectedUser: response.data.user
        })
      })
      .catch(err => console.log(err))
  }
}

// ** Add new user
export const addRole = (user, cb) => {
  return (dispatch, getState) => {
    axios
      .post('/api/auth/roles', user)
      .then(() => {
        dispatch({
          type: 'ADD_ROLE',
          user
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
        dispatch(getAllData())
        cb()
      })
      .catch(err => console.log(err))
  }
}

// ** Delete user
export const deleteRole = id => {
  return (dispatch, getState) => {
    axios
      .delete('/api/auth/roles', { id })
      .then(() => {
        dispatch({
          type: 'DELETE_ROLE'
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
        dispatch(getAllData())
      })
  }
}
