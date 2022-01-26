import React from 'react';
import MyPoststContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import s from './Profile.module.css';

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo
      isOwner={props.isOwner} 
      profile={props.profile}
      status={props.status}
      updateStatus={props.updateStatus}
      savePhoto={props.savePhoto}
      />
      <MyPoststContainer />
    </div>
  );
};

export default Profile;