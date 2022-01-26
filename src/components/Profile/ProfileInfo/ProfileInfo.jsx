import React from 'react';
import {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatusWithHooks from '../ProfileInfo/ProfileStatusWithHooks'
import peoplePhoto from '../../../assets/images/people.png';
import ProfileDataForm from './ProfileDataForm'

const ProfileInfo = (props) => {

  let [editMode, setEditMode] = useState(false)
  
  if (props.profile == null || props.profile == undefined) {
    return <Preloader />;
  }

  let obj = props.profile.contacts;
  let contact = [];
  for (var key in obj) {
    contact.push(obj[key]);
  }
  let newContact = contact.map(function (c) {
    return <div> {c} </div>;
  });

  const onMyPhotoSelected = (e) => {
      if (e.target.files.length) {
         props.savePhoto(e.target.files[0])
      } 
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large || peoplePhoto} className={s.mainPhoto} />
        <div>
          {props.isOwner && <input type={'file'} onChange={onMyPhotoSelected} />}
        </div>
       
        {editMode ? <ProfileDataForm profile={props.profile} /> :
        <ProfileData goToEditMode={() => { setEditMode(true) }} profile={props.profile} isOwner={props.isOwner} />}
        <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
      </div>
      <div>{newContact}</div>
    </div>
  );
};

const ProfileData = (props) => {
  return (
    <div>
     
      <div>
        <b>FullName:</b> {props.profile.fullName}
      </div>
      <div>
        <b>Looking for a job:</b> {props.profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      {props.profile.lookingForAJob &&
        <div>
          <b>My profesional skills:</b> {props.profile.lookingForAJobDescription}
        </div>
      }

      <div>
        <b>About me:</b> {props.profile.aboutMe}
      </div>

      <div>
        <b>Contacts</b> {Object.keys(props.profile.contacts).map((key) => {
          return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
        })}
      </div>
    </div>
  )
}


const Contact = ({ contactTitle, contactValue }) => {
  return <div><b>{contactTitle}:</b>{contactValue}</div>
}

export default ProfileInfo;