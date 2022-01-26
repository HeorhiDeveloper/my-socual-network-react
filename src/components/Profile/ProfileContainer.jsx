import React from 'react';
import Profile from '../Profile/Profile';
import s from './Profile.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {getPeopleProfileThunkCreator} from '../../redux/profile-reducer';
import { compose } from 'redux';
import {getStatus} from '../../redux/profile-reducer';
import {updateStatus} from '../../redux/profile-reducer';
import {savePhoto} from '../../redux/profile-reducer';

class ProfileContainer extends React.Component {

  refreshProfile() {
    let peopleId = this.props.match.params.peopleId
    if (peopleId === undefined) {
      peopleId = this.props.loginedId;
      if (peopleId === undefined) {
        this.props.history.push('/login')
      }
    }
    this.props.getPeopleProfileThunkCreator(peopleId)
    this.props.getStatus(peopleId)
  } 

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.peopleId!=prevProps.match.params.peopleId)
    {
      this.refreshProfile()
    }
  }

  render () {
     return (
      <div>
        <Profile 
        //владелец true and false
        isOwner={!this.props.match.params.peopleId}
        savePhoto={this.props.savePhoto}
        {...this.props} 
        profile={this.props.profile} 
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        />
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  loginedId: state.auth.id,
  isAuth: state.auth.isAuth
})

export default compose(
  connect(mapStateToProps, {getPeopleProfileThunkCreator, getStatus, updateStatus, savePhoto}),
  withRouter,
)(ProfileContainer)

