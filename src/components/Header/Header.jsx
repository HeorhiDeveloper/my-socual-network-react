import React from 'react';
import { NavLink } from 'react-router-dom';
import socialLogo from '../../assets/images/social.png';
import s from './Header.module.css';

const Header = (props) => {
    
    return (
    <header className={s.header}>
        <img className={s.socialLogo} src={socialLogo}/>
        <div className={s.loginBlock}>
            {props.isAuth ? 
            <div><span className={s.login}>{props.login}</span>
            <button onClick={props.logOut}>Log Out</button>
            </div>: 
            <NavLink to={'/login'}></NavLink>}
        </div>
        <div className={s.emailBlock}>
            {props.isAuth ? props.email:
            <NavLink to={'/email'}></NavLink>}
        </div>
    </header>
    )
}

export default Header;