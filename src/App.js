import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom'
import Wrapper from "./components/wrapper/Wrapper";
import Auth from "./components/auth/Auth";
import About from "./components/about/About";
import Location from "./components/location/Location";
import Main from "./components/Main/Main";
import {submitSimpleRegistration} from "./actionCreators/submitAuth";
import {getPlaces} from './actionCreators/placesMarks';
import {auth} from './firebase';

class App extends Component {

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.submitSimpleRegistration(user);
            } else {
                this.props.submitSimpleRegistration(null);
            }
        });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Wrapper>
                        <Route exact path='/' exact component={Main}/>
                        <Route exact path='/auth' component={Auth}/>
                        <Route exact path='/about' component={About}/>
                        <Route exact path='/location' component={Location}/>
                    </Wrapper>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(null, {submitSimpleRegistration, getPlaces})(App);
