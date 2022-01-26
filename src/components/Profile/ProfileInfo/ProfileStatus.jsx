import React from 'react';
import s from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode() {
        //пререзапись state
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode() {
        //пререзапись state
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    //
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    onStatusChange (e) {
        this.setState({
            status: e.currentTarget.value
        }) 
        
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange.bind(this)} 
                        autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} 
                        value={this.state.status} />
                    </div>
                }
            </div >
        )

    }
}

export default ProfileStatus;