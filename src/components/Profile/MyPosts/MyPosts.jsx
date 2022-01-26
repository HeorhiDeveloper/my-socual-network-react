import React, {PureComponent} from 'react';
import Post from '.././MyPosts/Post/Post';
import s from './MyPosts.module.css';
import { Field, reduxForm } from "redux-form";

const MyPosts = React.memo ((props) => {
 
let postsElements = props.posts.map((p)=>{return(<Post message={p.message} key={p.id} counter={p.likesCounter} />)})

const onSubmit = (value) => {
  props.addPost(value.NewPostsMessageBody)
}

return (
    <div className={s.postBlock}>
      <h3>My posts</h3>
    <MyPostsReduxForm onSubmit={onSubmit}/>
      <div className={s.posts}>
        {postsElements}
      </div>
    </div>
  )
})

const MyPostsForm = (props) => {
  return (
      <form onSubmit={props.handleSubmit}>
          <div>
              <Field className={s.formTextarea}
              name={"NewPostsMessageBody"} 
              component="textarea"
              placeholder={"Enter your message body"}
              />
          </div>
          <div>
              <button>Add post</button>
          </div>
      </form>
  )
}

const MyPostsReduxForm = reduxForm({
  form: 'NewPostsAddMessageForm'
})(MyPostsForm)

export default MyPosts;