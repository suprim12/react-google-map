import React, { useState, Fragment, useEffect } from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker, withScriptjs, withGoogleMap } from 'google-maps-react';
import Geocode from "react-geocode";



Geocode.setApiKey('AIzaSyDkyHmQkIBahcdnyiKoHSq0SUNvSyNzmEQ');
Geocode.enableDebug();
const MapContainer = (props) => {
    const [mapdata, setMapData] = useState({
        address: '',
        city: '',
        area: '',
        state: '',
        mapPosition: {
            lat: props.center.lat,
            lng: props.center.lng
        },
        markerPosition: {
            lat: props.center.lat,
            lng: props.center.lng
        },
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    });
    const { address, city, state } = mapdata;

    useEffect(() => {
        Geocode.fromLatLng(mapdata.mapPosition.lat, mapdata.mapPosition.lng).then(
            res => {
                console.log(res);
            }
        )
    }, []);

    const mapStyles = {
        width: '100%',
        height: props.height
    };
    const onMarkerClick = (props, marker, e) => {
        setMapData({
            ...mapdata,
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
    const onClose = props => {
        if (mapdata.showingInfoWindow) {
            setMapData({
                ...mapdata,
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    const handlechange = e => {
        setMapData({
            ...mapdata,
            [e.target.name]: e.target.value
        });
    }

    return (
        <Fragment>
            <div className="form-group">
                <div className="map-wrapper">
                    <Map
                        google={props.google}
                        zoom={props.zoom}
                        style={mapStyles}
                        initialCenter={{
                            lat: mapdata.mapPosition.lat,
                            lng: mapdata.mapPosition.lng
                        }}
                    >
                        <Marker
                            onClick={onMarkerClick}
                            name={'Kathmandu, BagBazar'}
                        />
                        <InfoWindow
                            marker={mapdata.activeMarker}
                            visible={mapdata.showingInfoWindow}
                            onClose={onClose}
                        >
                            <div>
                                <h4>{mapdata.selectedPlace.name}</h4>
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
            </div>
            <div className="form-group">
                <input type="text" name="address" value={address} onChange={handlechange} placeholder="Enter your address"></input>
            </div>
            <div className="form-group">
                <input type="text" name="city" value={city} onChange={handlechange} placeholder="Enter your city" ></input>
            </div>
            <div className="form-group">
                <input type="text" name="state" value={state} onChange={handlechange} placeholder="Enter your state" ></input>
            </div>
        </Fragment>
    )
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDkyHmQkIBahcdnyiKoHSq0SUNvSyNzmEQ'
})(MapContainer);
