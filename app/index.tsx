import React, { useEffect, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import { WebView } from "react-native-webview";

export default function HomeScreen() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location to show nearby POIs",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          console.log("Location permission denied");
        }
      } else {
        getLocation();
      }
    };

    const getLocation = () => {
      console.log("la fct getLocation est appellée")
      Geolocation.watchPosition(
        (position) => {
          console.log('frie ')
          console.log(position);
          //setLocation(position.coords);
        },
        (error) => {
          console.error(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };


    requestLocationPermission();
  }, []);

  return <WebView source={{ uri: "https://walterwater.vercel.app/" }} />;
}
