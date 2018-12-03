import React, {Component} from 'react';
import {Map, TileLayer, Marker, Popup, Tooltip} from 'react-leaflet';
import map from 'lodash/map';
import size from 'lodash/size';
import {connect} from 'react-redux';
import ZoomControl from "react-leaflet/es/ZoomControl";
import AsideLocation from "./AsideLocation";
import {saveMarkersToFirebase, addNewMarker, getMarkersFromFirebase,
    deleteMarkersFromFirebase, hideMarkersFromMap} from '../../actionCreators/markersFirebase';
import {findMyLocation} from '../../actionCreators/placesMarks';
import L from "leaflet";
import './location.less';

class Location extends Component {

    state = {};

    handleMapClick = (event) => {
        console.log(event);
        const lat = event.latlng.lat;
        const lng = event.latlng.lng;
        const newMarkers = {
            ...this.props.location.markers,
            ['key_' + (size(this.props.location.markers) + 1)]:
                {
                    key: 'marker' + (size(this.props.location.markers) + 1),
                    position: {lat: lat, lng: lng},
                    content: 'My popup'
                }
        };
        this.props.addNewMarker(newMarkers);
    };

    renderPlacesMarkers = () => {
        let markersArr = [];
        for (let i in this.props.placesMarkers) {

            const customMarker = L.icon({
                iconUrl: "/images/" + i + ".png",
                iconSize: [30, 47],
                iconAnchor: [24, 48],
                popupAnchor: null,
                shadowUrl: null,
                shadowSize: null,
                shadowAnchor: null
            });

            let markersTempArr = this.props.placesMarkers[i].map((item) => {
                return (
                    <Marker position={[item.venue.location.lat, item.venue.location.lng]}
                            key={item.venue.id} icon={customMarker}>
                        <Tooltip>
                            {"Category: " + i}
                            <br/>
                            {item.venue.name}
                            <br/>
                            {item.venue.location.address}
                        </Tooltip>
                    </Marker>
                )
            });
            markersArr = [...markersArr, ...markersTempArr];
        }
        return markersArr;
    };

    handleSaveBtnClick = (event) => {
        this.props.saveMarkersToFirebase();
    };

    handleShowBtnClick = (event) => {
        this.props.getMarkersFromFirebase();
    };

    handleDeleteBtnClick = (event) => {
        this.props.deleteMarkersFromFirebase();
    };

    handleHideBtnClick = (event) => {
        this.props.hideMarkersFromMap();
    };

    handleFindLocation = (event) => {
        this.mapNode.leafletElement.locate({setView: true})
            .on("locationfound", (e) => {
                let marker = L.marker([e.latitude, e.longitude]).bindPopup("Your are here :)");
                let circle = L.circle([e.latitude, e.longitude], e.accuracy / 2, {
                    weight: 1,
                    color: "#136AEC",
                    fillColor: "#136AEC",
                    fillOpacity: 0.15
                });
                this.mapNode.leafletElement.addLayer(marker);
                this.mapNode.leafletElement.addLayer(circle);
                this.props.findMyLocation(e.latitude, e.longitude);

            })
            .on("locationerror", (e) => {
                console.log(e);
                alert("Location access denied.");
            });

    };

    render() {
        const position = [this.props.location.lat, this.props.location.lng];
        console.log(this.props.placesMarkers);
        return (
            <div className="location-wrapper">
                <div className="wrapper-map-opacity"/>
                <AsideLocation/>
                <div className='map-wrapper'>
                    <Map center={position} zoom={this.props.location.zoom} zoomControl={false} doubleClickZoom={false}
                         ref={node => this.mapNode = node}
                         onClick={(event) => {
                             this.handleMapClick(event);
                         }}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                               location
                            </Popup>
                        </Marker>
                        {map(this.props.location.markers, (item, key) => {
                                return (
                                    <Marker position={[item.position.lat, item.position.lng]} key={key}>
                                        <Popup>
                                            A pretty CSS3 popup. <br/> Easily customizable.
                                        </Popup>
                                    </Marker>
                                )
                            }
                        )
                        }
                        {this.renderPlacesMarkers()}
                        <button className='find-location'
                                onClick={(event) => {
                                    this.handleFindLocation(event);
                                }}>
                            Find my location
                        </button>
                        <ZoomControl position={"bottomright"}/>
                    </Map>
                    <div className='btn-map-wrapper'>
                        <button onClick={(event) => {
                            this.handleSaveBtnClick(event);
                        }}>
                            save all markers
                        </button>
                        <button onClick={(event) => {
                            this.handleHideBtnClick(event);
                        }}>
                            hide all markers
                        </button>
                        <button onClick={(event) => {
                            this.handleShowBtnClick(event);
                        }}>
                            show all markers
                        </button>
                        <button onClick={(event) => {
                            this.handleDeleteBtnClick(event);
                        }}>
                            delete all markers
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        placesMarkers: state.places,
        location: state.location
    }
};

export default connect(mapStateToProps, {saveMarkersToFirebase, addNewMarker, getMarkersFromFirebase,
    deleteMarkersFromFirebase, hideMarkersFromMap, findMyLocation})(Location);