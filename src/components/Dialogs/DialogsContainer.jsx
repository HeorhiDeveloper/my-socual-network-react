import React from "react";
import Dialogs from "./Dialogs";
import {sendMessageCreator} from '../../redux/dialogs-reducer';
import { connect } from "react-redux";
import {withAuthRedirect} from '../../hog/withAuthRedirect';
import { compose } from "redux";


let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogPage.dialogs,
        messages: state.dialogPage.messages,
        newMessageBody: state.dialogPage.newMessageBody,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSendMessageClick: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)