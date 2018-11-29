import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import UserCard from "./UserCard";

class Header extends Component {
    render() {
        return (
            <header className='header'>
                <Link to='/' className='logo-wrapper'>
                    <div className='logo-img'/>
                    <div className='logo-name'>Lorem</div>
                </Link>
                <nav className='nav-wrapper'>
                    <Link className='nav-link' to='/about'>About</Link>
                    <Link className='nav-link' to='/location'>Location</Link>
                    {this.props.userData.user ? <UserCard user={this.props.userData.user}/>
                        : <Link className='nav-link' to='/auth'>Authorization</Link> }
                </nav>
            </header>
        );
    }
}

export default connect(state => {return {userData: state.userData}}) (Header);