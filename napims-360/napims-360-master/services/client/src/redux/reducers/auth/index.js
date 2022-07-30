// **  Initial State
const initialState = {
  userData: {},
  isLoading:false,
  error:null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userData: action.data,
        isLoading: false,
        [action.config.storageTokenKeyName]: action[action.config.storageTokenKeyName],
        [action.config.storageRefreshTokenKeyName]: action[action.config.storageRefreshTokenKeyName]
      }
    case 'LOGOUT':
      const obj = { ...action }
      delete obj.type
      return { ...state, userData: {}, ...obj }

    case 'AUTH_START':
      return { ...state, userData: {}, isLoading:true, ...obj }
    
    case 'AUTH_SUCCESS':
      return { ...state, userData: action.data, isLoading:false, ...obj }
    
    case 'AUTH_FAIL':
      return { ...state, userData: {}, error:action.data,  isLoading:false, ...obj }

    case 'NEW_LOGIN':
      return { ...state, userData: {}, ...obj }
    
    case 'FORGET_PASSWORD':
      return { ...state, userData: {}, ...obj }

    default:
      return state
  }
}

export default authReducer
