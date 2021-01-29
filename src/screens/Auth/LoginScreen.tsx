import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppNavigationProps } from "../../../types";
import * as LocalAuthentication from "expo-local-authentication";
import { displayError, RFValue } from "../../Utils/Utils";
import Colors from "../../constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SVG from "../../components/svg";
import { useFormik } from "formik";
import * as Yup from "yup";

// Get width of the device
const { width, height } = Dimensions.get("window");

const LoginScreen = ({ navigation }: AppNavigationProps<any>) => {
  const { top, bottom } = useSafeAreaInsets();

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

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(7, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const {
    values,
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      if (
        values.email !== "similoluwa@similoluwaodeyemi.com" ||
        values.password !== "12345678"
      ) {
        return Alert.alert("Error", "Invalid email/password");
      }
      navigation.navigate("HomePage");
      resetForm({});
    },
  });

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
              accessible={true}
              accessibilityLabel="Enter your email here"
              accessibilityHint="This is the email attached to your account"
              style={[
                styles.input,
                {
                  borderColor:
                    errors.email && touched.email
                      ? Colors.red
                      : Colors.borderColor,
                },
              ]}
              keyboardType="email-address"
              placeholderTextColor={Colors.color1}
              autoCapitalize={"none"}
              autoCorrect={false}
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {errors.email && touched.email && (
              <Text style={{ color: Colors.red }}>{errors.email} </Text>
            )}
          </View>
          <View
            style={[
              styles.passwordSection,
              {
                borderColor:
                  errors.password && touched.password
                    ? Colors.red
                    : Colors.borderColor,
              },
            ]}
          >
            <TextInput
              placeholder="Password"
              style={[styles.passwordInput]}
              placeholderTextColor={Colors.color1}
              secureTextEntry={hidePassword}
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              accessible={true}
              accessibilityLabel="Enter your password here"
              accessibilityHint="This is the password to your account"
            />
            <Ionicons
              name={hidePassword ? "eye-outline" : "eye-off-outline"}
              style={styles.eyeIcon}
              size={20}
              onPress={() => setHidePassword(!hidePassword)}
              color={Colors.iconColor}
            />
          </View>
          {errors.password && touched.password && (
            <Text style={{ color: Colors.red }}>{errors.password} </Text>
          )}
          <View style={{ height: 20 }} />
          <TouchableOpacity
            style={styles.signBtn}
            onPress={() => handleSubmit()}
            accessible={true}
            accessibilityLabel="Login button"
            accessibilityHint="This is the button to log you in"
            accessibilityRole="button"
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
    marginTop: RFValue(20),
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 12,
    marginBottom: 0,
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
