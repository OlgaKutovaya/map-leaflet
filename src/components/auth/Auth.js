import React, {Component} from 'react';
import {connect} from 'react-redux';
import {auth, googleAuthProvider} from '../../firebase';
import './auth.less';

class Auth extends Component {

    initialState = {name: '', phone: '', email: '', password: ''};
    state = this.initialState;

    handleChange = (event) => {
        const newState = {...this.state};
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        newState[fieldName] = fieldValue;
        this.setState({...newState}, () => {
            console.log(this.state);
        });
    };

    submitHandler = (event) => {
        event.preventDefault();

        const {email, password, name} = this.state;
        auth.createUserWithEmailAndPassword(email, password)

            .then(user => {
                user.updateProfile({
                    displayName: name
                }).then(function () {
                    alert('Successfully registered');
                    this.setState(this.initialState);
                }).catch(function (error) {
                    alert('Error while adding displayName');
                });
            })
            .catch(function (error) {
                alert('Please enter correct data');
            });
    };

    render() {
        return (
            <div className='auth-wrapper'>
                <div className="wrapper-opacity"/>
                <form className='form-enter-wrapper' noValidate
                      onSubmit={(event) => this.submitHandler(event)}>
                    <h2 className='form-heading'>Authorization</h2>
                    <label className='input-auth-wrapper'>
                        <span>Name:</span>
                        <input type="text"
                               name="name"
                               value={this.state.name}
                               placeholder='Name'
                               onChange={(event) => {
                                   this.handleChange(event);
                               }}
                        />
                    </label>
                    <label className='input-auth-wrapper'>
                        <span>E-mail:</span>
                        <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            placeholder='example@gmail.com'
                            onChange={(event) => {
                                this.handleChange(event);
                            }}
                        />
                    </label>
                    <label className='input-auth-wrapper'>
                        <span>Password:</span>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            placeholder='at least 6 characters'
                            onChange={(event) => {
                                this.handleChange(event);
                            }}
                        />
                    </label>
                    <input className='btn-submit'
                           type="submit"
                           value="Submit"
                           onChange={(event) => {
                               this.handleChange(event);
                           }}
                    />
                </form>
                <div className='auth-social-box'>
                    <label>
                        <span>sign in with google</span>
                        <button className='auth-btn'
                                onClick={() => auth.signInWithPopup(googleAuthProvider)}>
                        </button>
                    </label>
                </div>
            </div>
        );
    }
}

export default connect(null, {})(Auth);