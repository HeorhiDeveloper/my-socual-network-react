import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  
  return (
    <div className={s.item}>
      <img src='https://w7.pngwing.com/pngs/238/446/png-transparent-computer-icons-user-profile-avatar-old-man-face-heroes-head.png' />
      <span className={s.text}>{props.message} {props.counter}</span>
    </div>
  )
}

export default Post;