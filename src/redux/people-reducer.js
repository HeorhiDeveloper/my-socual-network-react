import {peopleAPI} from '../components/api/api'

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_PEOPLE = 'SET_PEOPLE';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_PEOPLE_COUNT = 'SET_TOTAL_PEOPLE_COUNT';
const LIKE = 'LIKE';
//крутилка
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

//скрытие кнопок
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
    people: [],
    pageSizePeople: 10,
    totalCountPeople: 0,
    currentPagePeople: 1, //начальная страница
    //крутилка 
    isFething: false,
    //скрытие кнопок
    followingInProgress: []
};

const peopleReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                people: state.people.map(p => {
                    if (p.id === action.peopleId) {
                        return { ...p, followed: true }
                    }
                    return p
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                people: state.people.map(p => {
                    if (p.id === action.peopleId) {
                        return { ...p, followed: false }
                    }
                    return p
                })
            }
        case LIKE: {
            return {
                ...state,
                people: state.people.map(p => {
                    if (p.id === action.peopleId) {
                        
                        return {...p, like: 1}
                    }
                    return p
                })
            }
        }      
        case SET_PEOPLE: {
            return {...state, people: action.people}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPagePeople: action.currentPagePeople}
        }
        case SET_TOTAL_PEOPLE_COUNT: {
            return {...state, totalCountPeople: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFething: action.isFething}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {...state, 
            followingInProgress: action.followingInProgress 
            ? [...state.followingInProgress, action.peopleId]
            : [...state.followingInProgress.filter(id=>id!=action.peopleId)]
        }
        }
        default:
        return state;
    }
}

//AC actionCreator
export const followSuccess = (peopleId) => {
    return {
        type: FOLLOW,
        peopleId: peopleId
    }
}

export const unfollowSuccess = (peopleId) => {
    return {
        type: UNFOLLOW,
        peopleId: peopleId
    }
}

export const setPeople = (people) => {
    return {
        type: SET_PEOPLE,
        people: people
    }
}

export const likePeople = (peopleId) => {
    return {
        type: LIKE,
        peopleId: peopleId
    }
}

export const setCurrentPagePeople = (currentPagePeople) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPagePeople: currentPagePeople
    }
}

export const setTotalPeopleCount = (totalCountPeople) => {
    return {
        type: SET_TOTAL_PEOPLE_COUNT,
        count: totalCountPeople
    }
}

export const toggleIsFething = (isFething) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFething: isFething
    }
}

export const toggleFollowingProgress = (followingInProgress, peopleId) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        followingInProgress: followingInProgress,
        peopleId: peopleId
    }
}


export const getPeopleThunkCreator = (page, pageSizePeople) => {
    return (dispatch) => {
        dispatch(toggleIsFething(true))
        dispatch(setCurrentPagePeople(page))
        peopleAPI.getPeoples(page, pageSizePeople)
        .then(data => {
                dispatch(toggleIsFething(false))
                dispatch(setPeople(data.items))
                dispatch(setTotalPeopleCount(data.totalCount))
            })
    }

}

export const follow = (peopleId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, peopleId))
        peopleAPI.follow(peopleId)
            .then(response => {
                //подписка произошла
                if (response.data.resultCode === 0) {
                    //вызови колбек
                    dispatch(followSuccess(peopleId))
                }
                dispatch(toggleFollowingProgress(false, peopleId))
        }) 
    }

}

export const unfollow = (peopleId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, peopleId))
        peopleAPI.unfollow(peopleId)
            .then(response => {
                //подписка произошла
                if (response.data.resultCode === 0) {
                    //вызови колбек
                    dispatch(unfollowSuccess(peopleId))
                }
                dispatch(toggleFollowingProgress(false, peopleId))
        }) 
    }

}

export default peopleReducer;