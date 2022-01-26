import React, {useState, useEffect} from 'react';
import s from './ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) => {

    //деструктуризация
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    //выполни эффекты когда компонента отрисуеться
    //если props.status будет другим запусти useEffect
    useEffect(()=>{
        setStatus(props.status)
    }, [props.status]) 

    const activateEditMode = () => {
        //пререзапись state
        setEditMode(true)
    } 

    const deactivateEditMode = () => {
        //пререзапись state
        setEditMode(false)
        //отправка измененного статуса на сервер
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <b>Status:</b> <span onDoubleClick={activateEditMode}>{props.status}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input 
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        onChange={onStatusChange}
                        value={status}  
                    />
                </div>
            }
        </div>
    )
} 

      
  
export default ProfileStatusWithHooks;