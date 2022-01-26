export const getPeople = (state) => {
    return  state.peoplePage.people;
}

export const getPageSizePeople = (state) => {
    return  state.peoplePage.pageSizePeople;
}

export const getTotalCountPeople = (state) => {
    return  state.peoplePage.totalCountPeople;
}

export const getCurrentPagePeople = (state) => {
    return  state.peoplePage.currentPagePeople;
}

export const getIsFething = (state) => {
    return  state.peoplePage.isFething;
}

export const getFollowingInProgress = (state) => {
    return  state.peoplePage.followingInProgress;
}