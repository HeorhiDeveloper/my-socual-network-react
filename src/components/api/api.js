import *as axios from "axios";

let instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
         'API-KEY': '7d662d05-4764-42c5-b9ae-9c4e8fafc44d'
    }
})

//People
export const peopleAPI = {
    getPeoples (currentPagePeople = 1, pageSizePeople = 10) {
        return instance.get(`users?page=${currentPagePeople}&count=${pageSizePeople}`,
    )
        .then(response => {return response.data})
    },
    follow(peopleId) {
    return instance.post(`follow/${peopleId}`, {})
    },
    unfollow(peopleId) {
        return instance.delete(`follow/${peopleId}`)
    },
    //Profile
    getProfile(peopleId) {
        console.warn('Obsolete metod. ---')
        return profileAPI.getProfile(peopleId)
    }
}


export const profileAPI = {
    //Profile
    getProfile(peopleId) {
        return instance.get(`profile/` + peopleId)
    },
    //Profile Status
    getStatus(peopleId) {
        return instance.get(`profile/status/` + peopleId)
    },
    updateStatus(status) {
        return instance.put(`profile/status`,{
            status: status
        })
    },
    savePhoto(photoFile) {
        const formData = new FormData()
        formData.append("image", photoFile)

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    } 
}

//Методы запроса для авторизации
export const authAPI = {
    //Header
    me() {
        return instance.get(`auth/me`);
    },
    //Login
    login(email,password,rememberMe=false, captcha=null) {
        return instance.post(`auth/login`,{email,password,rememberMe, captcha});
    },
    logOut() {
        return instance.delete(`auth/login`);
    }
};

//UsersInfo
export const usersInfoAPI = {
    //usersInfo Status
    getStatus(usersId) {
       return instance.get(`profile/status/` + usersId)
    },
    updateStatus(status) {
        return instance.put(`profile/status`,{
            status: status
        })
    } 
}

//Каптча
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
};


