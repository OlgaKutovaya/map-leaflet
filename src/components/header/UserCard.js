import React, {Component} from 'react';
import {auth} from '../../firebase';

class UserCard extends Component {

    handleSignOut = (event) => {
        // отправляем запрос на разлогинивание с фб
        auth.signOut()
            .then(response => alert('Successfull signout!'))
            .catch(error => console.log('Error while signout!'));
    };

    render() {
        console.log(this.props.user);
        return (
            <div className='user-info'>
                <div className="user-img" style={{background: `url(${this.props.user.photoURL})
                no-repeat center center`, backgroundSize: `60px 60px`}}/>
                <div className='user-inner-wrapper'>
                    <p>{this.props.user.displayName}</p>
                    <button className='btn-sign-out'
                            onClick={(event) => {
                                this.handleSignOut(event);
                            }}
                    >
                        sign out
                    </button>
                </div>
            </div>
        );
    }
}

export default UserCard;