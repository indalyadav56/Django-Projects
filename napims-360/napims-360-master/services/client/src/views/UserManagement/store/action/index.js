import axios from 'axios'
import users from '../tempUsers'
// ** Get all Data
export const getAllData = () => {
  return async dispatch => {
    // await axios.get('/api/users/list/all-data').then(response => {
      dispatch({
        type: 'GET_ALL_DATA',
        data: { data: users }
      })
    // })
  }
}

// ** Get data on page or row change
export const getData = params => {
  return async dispatch => {
    // await axios.get('/api/users/list/data', params).then(response => {
      dispatch({
        type: 'GET_DATA',
        data: users,
        totalPages: 10,
        params
      })
    // })
  }
}

// ** Get User
export const getUser = id => {
  return async dispatch => {
    await axios
      .get('/api/users/user', { id })
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
export const addUser = (user, cb) => {
  return (dispatch, getState) => {
    axios
      .post('/apps/users/add-user', user)
      .then(() => {
        dispatch({
          type: 'ADD_USER',
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
export const deleteUser = id => {
  return (dispatch, getState) => {
    axios
      .delete('/apps/users/delete', { id })
      .then(() => {
        dispatch({
          type: 'DELETE_USER'
        })
      })
      .then(() => {
        dispatch(getData(getState().users.params))
        dispatch(getAllData())
      })
  }
}
