import React, {Component} from 'react';
import {connect} from 'react-redux';
import {auth, googleAuthProvider, facebookAuthProvider, twitterAuthProvider} from '../../firebase';

class Auth extends Component {
    state = {
        name: '',
        phone: '',
        email: '',
        password: ''
    };

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
        const { email, password} = this.state;
        // отправляем на сервер ассинхр.действие и эта часть ждет ответа от сервера
        // ф-я создает юзера в firebase
        auth.createUserWithEmailAndPassword(email, password)
        // then - когда успешный отв.от сервера
            .then(response => {
                alert('Successfully registered!');
            })
            .catch(function(error) {
                console.log(error);
        });
    };

    render() {
        return (
            <div className='auth-wrapper'>
                <div className="wrapper-opacity"/>
                <form noValidate
                    onSubmit={(event) => this.submitHandler(event)}
                      className='form-enter-wrapper'>
                    <h2 className='form-heading'>Authorization</h2>
                    <label className='input-auth-wrapper'>
                        <span>Name:</span>
                        <input type="text"
                               name="name"
                               value={this.state.name}
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
                    <button className='auth-btn auth-google'
                            onClick={() => auth.signInWithPopup(googleAuthProvider)}>
                    </button>
                    <button className='auth-btn auth-facebook'
                            onClick={() => auth.signInWithPopup(facebookAuthProvider)}>
                    </button>
                    <button className='auth-btn auth-twitter'
                            onClick={() => auth.signInWithPopup(twitterAuthProvider)}>
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(null, {})(Auth);