import React, {Component} from 'react';
import {auth} from '../../firebase';

class UserCard extends Component {

    handleSignOut = (event) => {
        auth.signOut()
            .then(response => alert('Successful Sign out'))
            .catch(error => console.log('Error while sign out'));
    };

    render() {
        console.log(this.props.user);
        return (
            <div className='user-info'>
                <div className="user-img"
                     style={{background: `url(${(this.props.user && !this.props.user.photoURL)
                        ? '/images/user.png' : this.props.user.photoURL})
                        no-repeat center center`, backgroundSize: `60px 60px`
                }}/>
                <div className='user-inner-wrapper'>
                    <p>{(this.props.user && !this.props.user.displayName)
                        ? 'GUEST' : this.props.user.displayName}
                    </p>
                    <button className='btn-sign-out'
                            onClick={(event) => {
                                this.handleSignOut(event);
                            }}>
                        sign out
                    </button>
                </div>
            </div>
        );
    }
}

export default UserCard;