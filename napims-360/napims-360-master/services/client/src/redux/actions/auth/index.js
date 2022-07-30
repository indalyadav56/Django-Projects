// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'
import axios from 'axios'
import { decode } from 'jsonwebtoken'
import { toast } from 'react-toastify'


const config = useJwt.jwtConfig

// ** handle start
export const authStart = () => {
  
  return (dispatch) => {
    dispatch({type:"AUTH_START"})
  }
}

// ** handle success
export const authSuccess = (data) => {
  return (dispatch) => {
    dispatch({type:"AUTH_SUCCESS", data})
  }
}

// ** handle fail
export const authFail = (error) => {

  return (dispatch) => {
    dispatch({type:"AUTH_FAIL", error})
  }
}

// ** Handle User Login
export const handleLogin = ({ email, password }, cb) => {
  return async (dispatch) => {
    dispatch(authStart())
    const payload = { 
      email,
      password
     }
    await axios.post('/api/auth/login/', payload).then(({ data, status}) => {
      if (status === 200) {
        console.log(data)
        const userData = decode(data.id_token)

        dispatch({
          type: 'LOGIN',
          data: userData,
          config,
          ...data,
          [config.accessToken]: data.access_token
        })
        localStorage.setItem('userData', JSON.stringify(userData))
        localStorage.setItem('auth', JSON.stringify(data))
        localStorage.setItem(config.storageTokenKeyName, JSON.stringify(data.access_token))
        cb()
      }
      
    }).catch((err) => {
      const errorMessage = err.response.data.error_description || 'Unable to login'
      toast(errorMessage, { type: 'error'})
      dispatch(authFail(err))
    })
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    dispatch({ type: 'LOGOUT', [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null })

    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem('userData')
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('auth')
    localStorage.removeItem(config.storageTokenKeyName)
    localStorage.removeItem(config.storageRefreshTokenKeyName)
  }
}


// ** Handle User Forget Password
export const handleForgetPassword = email => {
  return dispatch => {
    dispatch(authStart())
    axios
    .post("/api/auth/forgot_password/", {
      email
    })
    .then((res) => {
      if (res.status === 200) {
        window.location.replace("/login")
        dispatch(authSuccess(data)) 
      }
    })
    .catch((error) => {
      dispatch(authFail(error)) 
    })
   dispatch({type:"FORGET_PASSWORD"})
  }
}

