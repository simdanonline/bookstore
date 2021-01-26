import { AntDesign, Feather, Fontisto } from "@expo/vector-icons";
import { Card } from "native-base";
import React from "react";
import { View } from "react-native";
import Colors from "../constants/Colors";
import SVG from "./svg";

interface Props {}

const NavBar = (props: Props) => {
  return (
    <React.Fragment>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingVertical: 22,

          borderRadius: 22,
          shadowColor: Colors.black,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 1,
          elevation: 1,
          backgroundColor: "#fff",
        }}
      >
        <SVG.HomeIcon />
        <SVG.BookmarkIcon />
        <SVG.CartIcon />
        <SVG.SettingIcon />
      </View>
    </React.Fragment>
  );
};

export default NavBar;
