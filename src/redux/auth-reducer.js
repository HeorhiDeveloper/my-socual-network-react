import {authAPI, securityAPI} from '../components/api/api';
import {stopSubmit} from 'redux-form';

const SET_PEOPLE_DATA = 'SET_PEOPLE_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PEOPLE_DATA: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.captchaUrl,
            }
        }
        default:
            return state;
    }
}

//Задача экшен криейтора вернуть экшен
export const setAuthPeopleData = (id, email, login, isAuth) => {
    return {
        type: SET_PEOPLE_DATA,
        payload: {id, email, login, isAuth}
    }
}

//каптча
export const getCaptchaUrlSuccess = (captchaUrl) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        captchaUrl: {captchaUrl}
    }
}

export const getAuthThunkCreator = () => (dispatch) => {
    return authAPI.me()
        .then((response) => {
            if (response.data.resultCode === 0) {
            let { id, login, email } = response.data.data;
            dispatch(setAuthPeopleData(id, email, login, true));
        }
    });
    
}

//Для формы Login вход
export const login = (email, password, rememberMe, captcha) => (dispatch) => {
    authAPI.login(email, password, rememberMe, captcha)
        .then((response) => {
            if (response.data.resultCode === 0) {
                //Проверяем залогинены ли мы 
                dispatch(getAuthThunkCreator())
            }
            //каптча
            else if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            else {
                let message = response.data.messages.length > 0 ? response.data.messages[0]: "Some error"
                dispatch(stopSubmit("login", { _error: message}));
            }
        });

}

//Для формы Login выход
export const logOut = () => {
    return (dispatch) => {
        authAPI.logOut()
            .then((response) => {
                if (response.data.resultCode === 0) {
                    //когда залогинились зануляем 
                    dispatch(setAuthPeopleData(null, null, null, false))
                }
            });
    }
}

//Каптча
// export const getCaptchaUrl = () => (dispatch) => {
//     securityAPI.getCaptchaUrl()
//         .then((response) => {
//             const captchaUrl = response.data.url
//             dispatch(getCaptchaUrlSuccess(captchaUrl))
//         });
// }

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export default authReducer;