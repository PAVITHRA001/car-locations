import React from 'react';
import {connect} from 'react-redux';
import {carLocationsFetch} from '../actions/car_locations_fetch.js';
import {withStyles} from "@material-ui/core/styles";
import {compose, withProps} from 'recompose';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import MapDetails from "../components/map_details_component";
import { RadialDistCalculation } from '../utils/radial_distance_calculation_utils';
import * as constants from '.././constants';


const styles = theme => ({
    paper: {
        paddingTop: '3%'
    },
});

const wrapperStyle = {
    height: `100%`
};

const locationIcon = {
    scale: 0.4,
    fillColor: 'red',
    fillOpacity: 1,
    strokeWeight: 1,
    rotation: 1
};

const icon = {
    path:   constants.carPath,
    scale: 0.6,
    fillColor: "#55FFAA",
    fillOpacity: 1,
    strokeWeight: 1,
    rotation: 1
};

const onTripicon = {
    path:   constants.carPath,
    scale: 0.6,
    fillColor: '#FA8072',
    fillOpacity: 1,
    strokeWeight: 1,
    rotation: 1
};

const mapContainerStyle = {
    paddingTop: '4%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: `400px`,
    width: '80%'
};

export class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: 1.310261,
            longitude: 103.829001,
            radialDistance: '',
        };
        this.findCarHandler = this.findCarHandler.bind(this);
        this.displayCarMarkers = this.displayCarMarkers.bind(this);
        this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
        this.handleLongitudeChange = this.handleLongitudeChange.bind(this);
        this.handleRadialDistanceChange = this.handleRadialDistanceChange.bind(this);
        this.filterCarBasedonRadialDistance = this.filterCarBasedonRadialDistance.bind(this);
    }

    findCarHandler() {
        this.props.carLocationsFetch();
    }

    filterCarBasedonRadialDistance(){
        return this.props.carLocations.filter((location) =>
            RadialDistCalculation.getDistanceFromLatLonInKm(this.state.latitude,this.state.longitude,location.latitude,location.longitude) <= this.state.radialDistance);
    }

    handleLatitudeChange(event) {
        this.setState({
            latitude: parseFloat(event.target.value)
        });
    }

    handleLongitudeChange(event) {
        this.setState({
            longitude: parseFloat(event.target.value)
        });
    }

    handleRadialDistanceChange(event) {
        this.setState({
            radialDistance: event.target.value
        });
    }

    displayCarMarkers() {
        let locations = this.state.radialDistance === '' ? this.props.carLocations : this.filterCarBasedonRadialDistance();
        return locations.map((location, index) => {
            return <Marker key={index} id={index}
                           position={{lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)}}
                           icon={location.is_on_trip ? onTripicon: icon}/>
        });

    }


    render() {
        const MyMapComponent = compose(
            withProps({
                googleMapURL:   constants.googleMapURL,
                loadingElement: <div style={wrapperStyle}/>,
                containerElement: <div style={mapContainerStyle}/>,
                mapElement: <div style={wrapperStyle}/>
            }),
            withScriptjs,
            withGoogleMap
        )(props => (
            (<GoogleMap defaultZoom={13} defaultCenter={{lat: this.state.latitude, lng: this.state.longitude}}>
                    <Marker position={{lat: this.state.latitude, lng: this.state.longitude}} icon={locationIcon}/>
                    {
                        this.props.carLocations && this.displayCarMarkers()
                    }
                </GoogleMap>
            )));
        return (
            <div style={{paddingTop: '3%'}}>
                <MapDetails
                    findCarHandler={this.findCarHandler}
                    handleLatitudeChange={this.handleLatitudeChange}
                    handleLongitudeChange={this.handleLongitudeChange}
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                    radialDistance={this.state.radialDistance}
                    handleRadialDistanceChange={this.handleRadialDistanceChange}
                />
                <MyMapComponent key="map"/>
            </div>
        );
    }
}

export const mapStateToProps = (state) => ({
    carLocations: state.carLocationFetchReducer.carLocations,
});

export const mapDispatchToProps = (dispatch) => bindActionCreators({
    carLocationsFetch
}, dispatch);

MapContainer.propTypes = {
    classes: PropTypes.object.isRequired

};

const connectedMapContainer = connect(mapStateToProps, mapDispatchToProps)(MapContainer);

export default withStyles(styles)(connectedMapContainer);