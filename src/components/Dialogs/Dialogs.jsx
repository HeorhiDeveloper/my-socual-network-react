import React from "react";
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, reduxForm } from "redux-form";


const Dialogs = (props) => {
    
    let dialogsElements = props.dialogs.map((d)=>{return(<DialogItem name={d.name} key={d.id} id={d.id} />)})
    let messagesElements = props.messages.map((m)=>{return(<Message message={m.message} key={m.id}/>)})

    let addNewMessage = (values) => {
        props.onSendMessageClick(values.newMessageBody)
    }
    
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
               {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
               <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field className={s.formTextarea} 
                component={"textarea"}                 
                name={"newMessageBody"}
                placeholder={"Enter your message body"}
                />
            </div>        
            <div><button>Send</button></div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({
    form: "dialogAddMessageForm"
})(AddMessageForm)

export default Dialogs;