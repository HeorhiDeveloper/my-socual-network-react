import { peopleAPI } from '../components/api/api';
import { profileAPI } from '../components/api/api';

const ADD_POST = 'ADD-POST';
//const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_PEOPLE_PROFILE = 'SET-PEOPLE-PROFILE';
const SET_STATUS = 'SET-STATUS';
//для тестирования
const DELETE_POST = 'DELETE-POST'
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS'


let initialState = {
    posts: [
        { id: 1, message: "Hi, You very good?", likesCounter: "10" },
        { id: 2, message: "It's my new post", likesCounter: "12" }
    ],

    //newPostText: 'You text',
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.NewPostsMessageBody,
                likesCounter: 0
            };

            return {
                ...state,
                posts: [...state.posts, newPost],
                //newPostText: ''
            }
        }
        
        case SET_PEOPLE_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
           
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
           
        }
        //для тестирования
        case DELETE_POST: {
            return {
                ...state,
                posts: state.posts.filter((p)=>p.id!=action.postId)
            }
           
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
           
        }
        
        default: 
            return state;
    }
}


export const addPostActionCreator = (NewPostsMessageBody) => {
    return {
        type: ADD_POST,
        NewPostsMessageBody: NewPostsMessageBody
    }
}

export const setPeopleProfile = (profile) => {
    return {
        type: SET_PEOPLE_PROFILE,
        profile: profile
    }
}


export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status: status
    }
}

//для тестирования
export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId: postId
    }
}

export const savePhotoSuccess = (photos) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos: photos
    }
}

export const getPeopleProfileThunkCreator = (peopleId) => {
    return (dispatch) => {
        peopleAPI.getProfile(peopleId)
        .then(response => {
            dispatch(setPeopleProfile(response.data))
        })
    }

}

export const getStatus = (peopleId) => {
    return (dispatch) => {
        profileAPI.getStatus(peopleId)
        .then(response => {
            dispatch(setStatus(response.data))
        })
    }

}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
        .then(response => {
            if(response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        })
    }

}


export const savePhoto = (file) => {
    return (dispatch) => {
        profileAPI.savePhoto(file)
        .then(response => {
            if(response.data.resultCode === 0) {
                dispatch(savePhotoSuccess(response.data.data.photos))
            }
        })
    }

}

export default profileReducer;