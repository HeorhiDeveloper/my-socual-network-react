import React from "react";
import s from './People.module.css';
import peoplePhoto from '../../assets/images/people.png';
import { NavLink } from "react-router-dom";

let Peoples = (props) => {
    
    let pagesCountPeople = Math.ceil(props.totalCountPeople/props.pageSizePeople)/60;
    let pagesPeople = [];
    for (let i=1; i<=pagesCountPeople; i++) {
        pagesPeople.push(i)
    }
    return (<div>
        <div className={s.peoplesNumbers}>
        {pagesPeople.map((p)=>{
               return <span className={props.currentPagePeople===p && s.selectedPagePeople} 
               onClick={(e)=>{props.onPageChangedPeople(p)}}>{p}</span>
            })}
        </div>
        {
        props.people.map(p =>
            <div className={s.peoples} key={p.id}>
                <span>
                    <div>
                    <NavLink to={'/profile/' + p.id}>    
                        <img src={p.photoUrl != null ? p.photoUrl : peoplePhoto} className={s.peoplePhoto} />
                    </NavLink>     
                    </div>
                    <div>
                        {p.followed ?
                            <button disabled={props.followingInProgress.some(id=>id===p.id)} onClick={() =>{
                                props.unfollow(p.id)

                            }}>UnFollow</button>
                            : <button disabled={props.followingInProgress.some(id=>id===p.id)} onClick={() =>{
                                props.follow(p.id)
                                
                            }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <div>
                        {p.name}
                    </div>
                    <div>
                        {p.status}
                    </div>
                </span>
                <span>
                    <div>
                        {'p.location.country'}
                    </div>
                    <div>
                        {'p.location.city'}
                    </div>
                </span>
            </div>
        )
    }
    </div>)
}

export default Peoples;
