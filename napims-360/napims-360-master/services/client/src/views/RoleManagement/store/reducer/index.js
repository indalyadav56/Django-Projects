// ** Initial State
const initialState = {
  allData: [],
  data: [],
  total: 1,
  params: {},
  selectedRole: null
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_DATA':
      return { ...state, allData: action.data }
    case 'GET_DATA':
      return {
        ...state,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
    case 'GET_ROLE':
      return { ...state, selectedRole: action.selectedRole }
    case 'ADD_ROLE':
      return { ...state }
    case 'DELETE_ROLE':
      return { ...state }
    default:
      return { ...state }
  }
}
export default users
