import React, {Component} from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import './location.less';
import map from 'lodash/map';
import size from 'lodash/size';
import ZoomControl from "react-leaflet/es/ZoomControl";

class Location extends Component {

    state = {
        lat: 46.4825,
        lng: 30.7233,
        zoom: 10,
        markers: {
            key_1: {key: 'marker1', position: {lat: 46.487166, lng: 30.722237}, content: 'My first popup'},
            key_2: {key: 'marker2', position: {lat: 46.46571, lng: 30.744682}, content: 'My second popup'},
            key_3: {key: 'marker3', position: {lat: 46.479719, lng: 30.756526}, content: 'My third popup'}
        }
    };

    handleMapClick = (event) => {
        console.log(event);
        const lat = event.latlng.lat;
        const lng = event.latlng.lng;
        const newMarkers = {...this.state.markers,
            ['key_' + (size(this.state.markers) + 1)] :
                {key: 'marker' + (size(this.state.markers) +1 ),
                position: {lat: lat, lng: lng},
                content: 'My popup'}
        };
        this.setState({
            markers: newMarkers
        })
    };

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <div className='map-wrapper'>
                <Map center={position} zoom={this.state.zoom} zoomControl={false} doubleClickZoom={false}
                onClick={(event) => {
                    this.handleMapClick(event);
                }}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br/> Easily customizable.
                        </Popup>
                    </Marker>
                    {map(this.state.markers, (item, key) => {
                        return (
                            <Marker position={[item.position.lat, item.position.lng]} key={key}>
                                <Popup>
                                    A pretty CSS3 popup. <br/> Easily customizable.
                                </Popup>
                            </Marker>
                        )
                    })
                    }
                    <ZoomControl position={"bottomright"}/>
                </Map>
            </div>
        );
    }
}

export default Location;