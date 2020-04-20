import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker } from 'react-native-maps';



export default
    class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: []
        }
    }
    componentDidMount() {
        fetch("https://api.covid19api.com/all")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson
                });
                //dataSource = responseJson
                //console.log(responseJson);
                console.log(this.state.dataSource[0].Confirmed)
            })
                //this.setState({
                //    isLoading: false,
                //    dataSource: responseJson
                //},
                //);
            //})
    };
        point = {
            markers: [
                {
                    id: 0,
                    coordinate: {
                        latitude: 42.000,
                        longitude: -71.055528,
                    },
                    title: "Home",
                    description: "This is where I live",
                },
                {
                    id: 1,
                    coordinate: {
                        latitude: 42.453921,
                        longitude: -70.975554,
                    },
                    title: "Work",
                    description: "This is where I work",
                },
            ],
            region: {
                latitude: 45.52220671242907,
                longitude: -122.6653281029795,
                latitudeDelta: 0.04864195044303443,
                longitudeDelta: 0.040142817690068,
            },
        };
    render() {
        if (this.state.isLoading) {
            return (
                <MapView
                    style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    initialRegion={{
                        latitude: 42.361145,
                        longitude: -71.057083,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                />
            )
        }
        else {
            return (
                <MapView
                    style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    initialRegion={{
                        latitude: 42.361145,
                        longitude: -71.057083,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                >
                    {this.state.dataSource((index) => {
                        return (
                            <MapView.Marker key={index} coordinate={42.000,-71.000}>
                                <View style={styles.marker} />
                                <MapView.Callout tooltip style={styles.customView}>
                                    <View style={styles.calloutText}>
                                        <Text>{"hello"}</Text>
                                    </View>
                                </MapView.Callout>
                            </MapView.Marker>
                        );
                    })}
                </MapView>
            );
        }
    };
}
const styles = StyleSheet.create({
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    customView: {
        width: 50,
        height: 50,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    calloutText: {
        fontSize:16
    }
});