import React from "react";
import LottieView from "lottie-react-native";
import { View, Platform, ActivityIndicator, Image } from "react-native";
import Modal from "react-native-modal";
import Colors from "../constants/Colors";

interface Props {
  shown: boolean;
}

const LoadingView = ({ shown }: Props) => {
  return (
    <React.Fragment>
      <Modal isVisible={shown}>
        <View
          style={{
            borderWidth: 0,
            alignItems: "center",
            justifyContent: "center",
            // width: width * 0.6,
          }}
        >
          {Platform.OS === "ios" ? (
            <LottieView
              style={{
                width: 150,
                height: 150,
                backgroundColor: "transparent",
                alignSelf: "center",
              }}
              source={require("../assets/json/books.json")}
              autoPlay
              loop
            />
          ) : (
            <View>
              <ActivityIndicator size="large" color={Colors.color1} />
            </View>
          )}
        </View>
      </Modal>
    </React.Fragment>
  );
};

export default LoadingView;
