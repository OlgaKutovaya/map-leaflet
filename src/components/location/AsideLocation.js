import React, {Component} from 'react';
import './asideLocation.less';
import {connect} from 'react-redux';
import {getPlaces} from '../../actionCreators/placesMarks';

class AsideLocation extends Component {
    render() {
        return (
            <div className="aside-location-wrapper">
                <div className="icon-wrapper"
                     onClick={(event) => {
                         this.props.getPlaces('аптека');
                     }}>
                    <div className="icon-img icon-pharmacies"/>
                    <p>pharmacies</p>
                </div>
                <div className="icon-wrapper"
                     onClick={(event) => {
                         this.props.getPlaces('шиномонтаж');
                     }}>
                    <div className="icon-img icon-tire-fitting"/>
                    <p>tire fitting</p>
                </div>
                <div className="icon-wrapper"
                     onClick={(event) => {
                         this.props.getPlaces('школа');
                     }}>
                    <div className="icon-img icon-schools"/>
                    <p>schools</p>
                </div>
                <div className="icon-wrapper"
                     onClick={(event) => {
                         this.props.getPlaces('ресторан');
                     }}>
                    <div className="icon-img icon-restaurants"/>
                    <p>restaurants</p>
                </div>
            </div>
        );
    }
}


export default connect(null, {getPlaces})(AsideLocation);