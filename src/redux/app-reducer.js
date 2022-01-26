import {getAuthThunkCreator} from '../redux/auth-reducer'

//иницилизация успешна
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true,
            }
        }
        default:
            return state;
    }
}

//Задача экшен криейтора вернуть экшен
export const initializedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS,
    }
}

//Проинцелизируй App
export const initializeApp = () => (dispatch) => {
   let promise = dispatch(getAuthThunkCreator())

   Promise.all([promise])
   .then(()=>{
        dispatch(initializedSuccess())
   })
   
   
}

export default appReducer;