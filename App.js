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
            dataSource: [],
        }
    }

    getData() {
        console.log('Data is fetching')
        fetch("https://covid-19-data.p.rapidapi.com/country/all?format=json", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
                "x-rapidapi-key": "your key here"
            }
        })
        //fetch("https://api.covid19api.com/summary")
            .then((response) => response.json())
            .then((responseJson) => {
                dataSource2 = responseJson,
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                });
                console.log(dataSource2)
                // console.log(typeof dataSource2[0].latitude)
                // console.log(dataSource2.Countries[0].TotalConfirmed)
                // console.log(dataSource)
                console.log('I am done')
            })
            .catch((error) => {
                console.error(error);
            });
    };

    componentDidMount() {
        this.getData();
    }

    point = {
        markers: [
            {
                id: 0,
                coordinate: {
                    latitude: 42.000,
                    longitude: -71.055528,
                },
                title: "home",
                description: "this is where I sleep",
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
        else if (!this.state.isLoading) {
            return (
                console.log(dataSource2[10]),
                console.log(dataSource2[10].latitude),
                console.log(dataSource2[10].longitude),
                <MapView
                    style={{ flex: 1 }}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    initialRegion={{
                        latitude: 42.361145,
                        longitude: -71.057083,
                        latitudeDelta: 50.0,
                        longitudeDelta: 50.0
                    }}>
                    {dataSource2.map((marker, index) => {
                        if (marker.latitude != null) {
                            return (
                                <MapView.Marker key={index} coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                    title={marker.country}>
                                    <View style={styles.marker} />
                                    <MapView.Callout tooltip style={styles.customView}>
                                        <View style={styles.calloutText}>
                                            <Text>{marker.confirmed}</Text>
                                        </View>
                                    </MapView.Callout>
                                </MapView.Marker>
                            );
                        }
                    })}
                </MapView>
            )
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
