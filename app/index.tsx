import { WebView } from "react-native-webview";

// export default function HomeScreen() {
//   return <WebView source={{ uri: "https://walterwater.vercel.app/" }} />;
// }

import { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // Only for dev purposes.
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!"
        );
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // TODO : remove this dev bit
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // Inject the location into WebView
  const injectedJavaScript = location
    ? `window.dispatchEvent(new CustomEvent('locationReceived', { detail: { latitude: ${location.latitude}, longitude: ${location.longitude} }}));`
    : "";

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
        <Text style={styles.paragraph}>{"jimbo"}</Text>
      </View>
      <WebView
        style={styles.webview}
        source={{ uri: "http://walterwater.vercel.app/" }}
        injectedJavaScript={injectedJavaScript}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  webview: {
    height: 27,
  },
});