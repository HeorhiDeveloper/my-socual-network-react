//const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs: [
        { id: 1, name: "Oleg" },
        { id: 2, name: "Natali" },
        { id: 3, name: "Georg" },
        { id: 4, name: "Victor" }
    ],
    messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "Hi my friend" },
        { id: 3, message: "Yo" },
        { id: 4, message: "+" }
    ],
    //newMessageBody: " "
}

const dialogsReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody;
            return {
                ...state,
                //newMessageBody: ' ',
                messages: [...state.messages, { id: 5, message: body}]
            };

            // stateCopy = {...state};
            // stateCopy.newMessageBody = ' ';
            // stateCopy.messages = [...state.messages];
            // stateCopy.messages.push({ id: 5, message: body})

            //return stateCopy;
        }

        // case UPDATE_NEW_MESSAGE_BODY: {
        //     return {
        //         ...state,
        //         newMessageBody: action.body
        //     };
        //     // stateCopy = {...state};
        //     // stateCopy.newMessageBody = action.body;
        //     //return stateCopy;
        // }
        default: 
            return state;
    }
}

//Dialogs
export const sendMessageCreator = (newMessageBody) => {
    debugger
    return {
        type: SEND_MESSAGE,
        newMessageBody: newMessageBody
    }
}

// export const updateNewMessageBodyCreator = (body) => {
//     return {
//         type: UPDATE_NEW_MESSAGE_BODY,
//         body: body
//     }
// }
  

export default dialogsReducer;