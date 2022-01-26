import React from 'react';
import { reduxForm } from 'redux-form';

const ProfileDataForm = (props) => {
    return (
        <form>
            {<div><button onClick={()=>{}}>Save</button></div>}
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
        </form>
    )
}

const profileDataFormeReduxForm = reduxForm({form: 'edit-mode'})(ProfileDataForm)

export default profileDataFormeReduxForm;