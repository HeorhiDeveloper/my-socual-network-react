import React from "react";
import Peoples from '../People/Peoples';
import { connect } from "react-redux";
import {follow} from '../../redux/people-reducer';
import {unfollow} from '../../redux/people-reducer';
import {likePeople} from '../../redux/people-reducer';
import {setCurrentPagePeople} from '../../redux/people-reducer';
import Preloader from '../common/Preloader/Preloader';
import {toggleFollowingProgress} from '../../redux/people-reducer';
import {getPeopleThunkCreator} from '../../redux/people-reducer';
import {withAuthRedirect} from '../../hog/withAuthRedirect';
import { compose } from 'redux';
import {getPeople} from '../../redux/people-selectors';
import {getPageSizePeople, getTotalCountPeople, getCurrentPagePeople} from '../../redux/people-selectors';
import {getIsFething} from '../../redux/people-selectors';
import {getFollowingInProgress} from '../../redux/people-selectors';

class PeopleContainer extends React.Component {
    componentDidMount () {
        this.props.getPeople(this.props.currentPagePeople, this.props.pageSizePeople)
    }

    onPageChangedPeople = (pageNumber) => {
        this.props.getPeople(pageNumber, this.props.pageSizePeople)
    }

    render () {
       return <>
            {this.props.isFething ? <Preloader/> : null}  
       <Peoples 
       totalCountPeople={this.props.totalCountPeople}
       pageSizePeople={this.props.pageSizePeople}
       currentPagePeople={this.props.currentPagePeople}
       onPageChangedPeople={this.onPageChangedPeople}
       follow={this.props.follow}
       unfollow={this.props.unfollow}
       likePeople={this.props.likePeople}
       people={this.props.people}
       followingInProgress={this.props.followingInProgress}

       /> 
    </>
    }
    
}

let mapStateToProps = (state) => {
    return {
       people: getPeople(state),
       pageSizePeople: getPageSizePeople(state),
       totalCountPeople: getTotalCountPeople(state),
       currentPagePeople: getCurrentPagePeople(state),
       //loader
       isFething: getIsFething(state),
       //скрытие кнопок
       followingInProgress: getFollowingInProgress(state),
    }
}

export default compose(
    connect(mapStateToProps, {
        follow, unfollow, likePeople,
        setCurrentPagePeople,
        toggleFollowingProgress,
        getPeople: getPeopleThunkCreator,
    }),
  withAuthRedirect
)(PeopleContainer)