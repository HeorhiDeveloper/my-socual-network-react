import React from 'react';
import profileReducer from '../redux/profile-reducer';
import { addPostActionCreator, deletePost} from '../redux/profile-reducer';

let state = {
    posts: [
        { id: 1, message: "Hi, You very good?", likesCounter: "10" },
        { id: 2, message: "It's my new post", likesCounter: "12" }
    ]
};

//тест добавление нового поста
it('after deleting lenght of message should be decrement', () => {
    //1. test data
    let action = deletePost(1);
    //2. action
    //проверяем отлич ли newState от старого state
    let newState = profileReducer(state, action);
    //3. expectation
    expect(newState.posts.length).toBe(1);
});


it('message of posts should be hello my friend', () => {
    //1. test data
    let action = addPostActionCreator("hello my friend");
    //2. action
    //проверяем отлич ли newState от старого state
    let newState = profileReducer(state, action);
    //3. expectation
    expect(newState.posts[2].message).toBe("hello my friend");
});
