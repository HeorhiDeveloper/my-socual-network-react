import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";
import {login} from "../../redux/auth-reducer";
import s from './Login.module.css';

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    
    return (
        <form  onSubmit={handleSubmit}>
            <div>
                <Field className={s.input} placeholder={"Email"} name={"email"} component={"input"} />
            </div>
            <div>
                <Field  className={s.input} placeholder={"Password"} name={"password"} type={"password"} component={"input"}/>
            </div>
            <div>
                <Field  type={"checkbox"} name={"rememberMe"} component={"input"}/><span>remember me</span> 
            </div>

            {/* каптча */}
            {captchaUrl && <img className={s.imgCaptcha} alt="#" src={captchaUrl}/>}

            {/* поле ввода каптчи*/}
            {captchaUrl &&  
            <div>
                 <Field className={s.captcha} placeholder={"Captcha"} name={"captcha"} component={"input"}/>
            </div>
            }
                            
            {error && <div className={s.form_error}>
                {error}
            </div>
            }
            
            <div>
                <button className={s.bt}>Login</button>
            </div>
        </form>
    )
}

const LodinReduxForm = reduxForm({
    form: "login"
})(LoginForm)

const Login = (props) => {
    
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    
    return (
        <div className={s.form}>
            <h3>Login</h3>
            <LodinReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login}) (Login);