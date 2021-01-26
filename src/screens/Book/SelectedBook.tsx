import { Fontisto, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SkeletonContent from "react-native-skeleton-content";
import { AppNavigationProps } from "../../../types";
import Colors from "../../constants/Colors";
import { AirbnbRating } from "react-native-ratings";
import bookApi from "../../api/bookApi";
import { displayError, RFValue } from "../../Utils/Utils";
import { BookType } from "../HomePage/HomePage";
import LoadingView from "../../components/LoadingView";
import * as WebBrowser from "expo-web-browser";

const { width } = Dimensions.get("window");

const SelectedBook = ({ route, navigation }: AppNavigationProps<any>) => {
  // @ts-ignore
  const { book } = route.params;
  const [bookInfo, setBookInfo] = React.useState<BookType>();
  const [fetching, setFetching] = React.useState<boolean>(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await bookApi.get(`/books/${book.isbn13}`);
        setBookInfo(data);
        setFetching(false);
      } catch (error) {
        displayError(error.message);
      }
    })();
  }, []);

  const onPressPreview = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.pageBg, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-outline" size={30} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Fontisto name="bookmark" size={20} style={{ paddingRight: 30 }} />
            <MaterialCommunityIcons name="dots-vertical" size={20} />
          </View>
        </View>
        <View>
          <View style={{ alignItems: "center" }}>
            <SkeletonContent
              containerStyle={{ alignItems: "center" }}
              animationDirection="horizontalLeft"
              isLoading={fetching}
              layout={[
                {
                  key: "1",
                  width: RFValue(200),
                  height: RFValue(320),
                  marginBottom: 6,
                },
                {
                  key: "2",
                  width: RFValue(width * 0.8),
                  height: RFValue(50),
                },
                {
                  key: "3",
                  width: RFValue(width * 0.8),
                  height: RFValue(20),
                  marginTop: 10,
                },
                {
                  key: "4",
                  width: RFValue(width * 0.8),
                  height: RFValue(30),
                  marginTop: 10,
                },
                {
                  key: "5",
                  width: RFValue(width * 0.8),
                  height: RFValue(80),
                  marginTop: 10,
                },
              ]}
            />
          </View>
          <Image source={{ uri: bookInfo?.image }} style={styles.image} />
          <View>
            <Text style={styles.bookTitle}>{bookInfo?.title} </Text>
            <Text style={styles.bookSubtitle}>{bookInfo?.authors} </Text>
            <View style={styles.ratingContainer}>
              <AirbnbRating
                count={5}
                reviews={["Terrible", "Bad", "Meh", "OK", "Good"]}
                defaultRating={bookInfo?.rating}
                size={20}
                showRating={false}
                isDisabled={true}
              />
              <Text style={styles.ratingText}>
                <Text>{bookInfo?.rating}</Text>
                <Text style={{ opacity: 0.5 }}>/5.0</Text>
              </Text>
            </View>
            <Text style={styles.bookDesc}>{bookInfo?.desc}</Text>
          </View>

          <View>
            <View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.pageBtn}
                  onPress={() => onPressPreview(bookInfo?.pdf["Free eBook"])}
                >
                  <Image
                    source={require("../../assets/img/Vector.png")}
                    style={styles.menuIcon}
                  />
                  <Text style={styles.btnText}>Preview</Text>
                </TouchableOpacity>
                <View style={styles.pageBtn}>
                  <Ionicons name="ios-chatbubble-ellipses-outline" size={22} />
                  <Text style={styles.btnText}>Reviews</Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.buyBtn}>
            <Text style={styles.buyText}>Buy Now for {bookInfo?.price}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <LoadingView shown={fetching} />
    </SafeAreaView>
  );
};

export default SelectedBook;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: RFValue(30),
    paddingTop: RFValue(30),
  },
  image: {
    height: RFValue(320),
    width: RFValue(216),
    alignSelf: "center",
  },
  bookTitle: {
    fontSize: RFValue(24),
    fontFamily: "poppins600",
    textAlign: "center",
    paddingHorizontal: RFValue(width * 0.1),
    color: Colors.color1,
  },
  bookSubtitle: {
    textAlign: "center",
    fontFamily: "poppins500",
    fontSize: RFValue(14),
    color: Colors.color1,
    lineHeight: RFValue(21),
    paddingVertical: RFValue(10),
    opacity: 0.5,
  },
  bookDesc: {
    paddingHorizontal: RFValue(width * 0.1),
    textAlign: "center",
    fontFamily: "poppins400",
    fontSize: RFValue(14),
    lineHeight: RFValue(24),
    opacity: 0.5,
    color: Colors.color1,
  },
  menuIcon: {
    width: RFValue(18),
    height: RFValue(13),
    backgroundColor: "#fff",
  },
  pageBtn: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: RFValue(10),
    justifyContent: "center",
    paddingHorizontal: RFValue(35),
    alignItems: "center",
    borderRadius: 8,

    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1,
  },
  btnText: {
    fontSize: RFValue(14),
    fontFamily: "poppins500",
    lineHeight: RFValue(24),
    paddingLeft: RFValue(15),
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: RFValue(20),
  },
  buyBtn: {
    backgroundColor: Colors.black,
    paddingVertical: RFValue(18),
    marginHorizontal: RFValue(20),
    marginTop: RFValue(35),
    borderRadius: 16,
    marginBottom: RFValue(70),
  },
  buyText: {
    color: Colors.white,
    textAlign: "center",
    lineHeight: RFValue(24),
    fontSize: RFValue(16),
    fontFamily: "poppins500",
  },
  ratingText: {
    fontSize: RFValue(14),
    fontFamily: "poppins500",
    color: Colors.color1,
    paddingLeft: RFValue(10),
    lineHeight: RFValue(21),
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 15,
  },
});
