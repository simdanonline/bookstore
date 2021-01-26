import { AxiosError } from "axios"
import { Toast } from "native-base"
import { Dimensions, Platform, StatusBar } from "react-native";


export const displayError = (error: string) => {
    Toast.show({
        text: error,
        type: "danger",
        duration: 5000
    })
}

function isIphoneX() {
    const dimen = Dimensions.get("window");
    return (
        Platform.OS === "ios" &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 780 ||
            dimen.width === 780 ||
            dimen.height === 812 ||
            dimen.width === 812 ||
            dimen.height === 844 ||
            dimen.width === 844 ||
            dimen.height === 896 ||
            dimen.width === 896 ||
            dimen.height === 926 ||
            dimen.width === 926)
    );
}

const { width, height } = Dimensions.get("window");

const standardLength = width > height ? width : height;

const offset =
    width > height ? 0 : Platform.OS === "ios" ? 78 : StatusBar.currentHeight; // iPhone X style SafeAreaView size in portrait


// Get the height of the device
const deviceHeight =
    isIphoneX() || Platform.OS === "android"
        ? standardLength - offset!
        : standardLength;


// Refactor value of size passed based on screen size, for responsiveness
export function RFValue(fontSize: number, standardScreenHeight: number = 813) {
    const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
    return Math.round(heightPercent);
}

