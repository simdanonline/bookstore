import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppNavigationProps } from "../../../types";
import * as LocalAuthentication from "expo-local-authentication";
import { displayError, RFValue } from "../../Utils/Utils";
import Colors from "../../constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SVG from "../../components/svg";

// Get width of the device
const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }: AppNavigationProps<any>) => {
  // state of whether to show password or hide
  const [hidePassword, setHidePassword] = React.useState(true);

  // Function to use device biometrics if it exists
  const useBio = async () => {
    try {
      const hasBio = await LocalAuthentication.hasHardwareAsync();
      if (!hasBio) {
        return displayError("No bio metrics found");
      }
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        return displayError("You have not setup biometrics on your device");
      }
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login using biometrics",
      });
      if (auth.success) {
        navigation.navigate("HomePage");
      }
    } catch (error) {
      displayError(error.message);
    }
  };

  const { top, bottom } = useSafeAreaInsets();

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: top, paddingBottom: bottom },
        ]}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View>
              <SVG.TopLeft />
              <View style={styles.whiteSemiCircle} />
            </View>
            <View style={{ flexDirection: "row" }}>
              <SVG.TopCenter style={{ marginTop: 60, marginRight: -40 }} />
              <SVG.TopRight />
            </View>
          </View>
          <View style={{ flexDirection: "row", paddingLeft: 30 }}>
            <View>
              <Text style={styles.heroText}>Adventures in literature.</Text>
              <Text style={styles.join}>Join our community</Text>
            </View>
            <SVG.MiddleCenter />
            <SVG.MiddleRight />
          </View>
          <View style={styles.bottomSvg}>
            <SVG.BottomLeft />
            <SVG.BottomMiddle />
            <SVG.BottomRight />
          </View>
        </View>

        <View style={styles.formWrapper}>
          <Text style={styles.loginText}>Log in</Text>
          <View>
            <TextInput
              placeholder="Email"
              style={styles.input}
              keyboardType="email-address"
              placeholderTextColor={Colors.color1}
              autoCapitalize={"none"}
              autoCorrect={false}
            />
          </View>
          <View style={styles.passwordSection}>
            <TextInput
              placeholder="Password"
              style={styles.passwordInput}
              placeholderTextColor={Colors.color1}
              secureTextEntry={hidePassword}
            />
            <Ionicons
              name={hidePassword ? "eye-outline" : "eye-off-outline"}
              style={styles.eyeIcon}
              size={20}
              onPress={() => setHidePassword(!hidePassword)}
              color={Colors.iconColor}
            />
          </View>
          <TouchableOpacity
            style={styles.signBtn}
            onPress={() => navigation.navigate("HomePage")}
          >
            <Text style={styles.signInText}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fingerPrint} onPress={useBio}>
            <Ionicons name="finger-print-sharp" size={30} />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    opacity: 1,
    overflow: "hidden",
  },
  formWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    paddingHorizontal: RFValue(42),
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  input: {
    borderWidth: 1,
    paddingTop: RFValue(15),
    paddingBottom: RFValue(15),
    borderColor: Colors.borderColor,
    paddingLeft: RFValue(22),
    borderRadius: 12,
    color: Colors.color1,
  },
  passwordInput: {
    flex: 1,
    borderWidth: 0,
    paddingTop: RFValue(16),
    paddingBottom: RFValue(15),
    paddingLeft: RFValue(22),
    paddingRight: RFValue(10),
    color: Colors.color1,
  },
  loginText: {
    fontSize: RFValue(16),
    fontFamily: "poppins600",
    paddingTop: RFValue(37),
    paddingBottom: RFValue(20),
    lineHeight: RFValue(24),
    color: Colors.color1,
  },
  signInText: {
    textAlign: "center",
    fontSize: RFValue(16),
    fontFamily: "poppins500",
    lineHeight: RFValue(23.36),
    color: Colors.white,
    paddingVertical: RFValue(12),
  },
  signBtn: {
    backgroundColor: Colors.black,
    borderRadius: 15,
  },
  fingerPrint: {
    alignSelf: "center",
    marginVertical: RFValue(30),
  },
  passwordSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
    marginVertical: RFValue(20),
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 12,
  },
  eyeIcon: {
    padding: 10,
  },
  heroText: {
    fontSize: RFValue(24),
    lineHeight: RFValue(29.5),
    fontFamily: "poppins600",
    width: RFValue(148),
    color: Colors.color2,
  },
  join: {
    color: Colors.color3,
    marginTop: RFValue(35),
  },
  middle: {
    width: RFValue(130 * 0.8),
    height: RFValue(130 * 0.8),
    opacity: 0.1,
  },
  whiteSemiCircle: {
    width: 0,
    height: 0,
    borderTopWidth: 36,
    borderTopColor: Colors.white,
    borderRightColor: Colors.white,
    borderRightWidth: 18,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    position: "absolute",
    top: 80,
    left: 20,
  },
  bottomSvg: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
});
