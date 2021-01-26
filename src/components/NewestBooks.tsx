import { Fontisto } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/Colors";
import { BookType } from "../screens/HomePage/HomePage";
import { Rating, AirbnbRating } from "react-native-ratings";
import { RFValue } from "../Utils/Utils";

interface Props {
  book: BookType;
  onPress: (book: BookType) => void;
}

const { width } = Dimensions.get("window");

const boxSize = width - RFValue(60);

const NewestBooks = ({ book, onPress }: Props) => {
  return (
    <React.Fragment>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          borderWidth: 0,
        }}
        onPress={() => onPress(book)}
      >
        <View style={{ width: boxSize * 0.25 }}>
          <Image source={{ uri: book.image }} style={styles.image} />
        </View>
        <View style={{ width: boxSize * 0.5 }}>
          <Text style={styles.bookName}>
            {book.title.substring(0, 30) +
              `${book.title.length > 30 ? "..." : ""}`}{" "}
          </Text>
          <Text style={[styles.bookSubtitle]}>
            {book.subtitle.substring(0, 30) +
              `${book.subtitle.length > 30 ? "..." : ""}` ||
              "Sample subtitle"}{" "}
          </Text>
          <View style={{alignSelf:"flex-start"}} >
            <AirbnbRating
              count={5}
              reviews={["Terrible", "Bad", "Meh", "OK", "Good"]}
              defaultRating={3}
              size={15}
              showRating={false}
            />
          </View>
        </View>
        <View style={{ width: boxSize * 0.25, alignItems: "flex-end" }}>
          <Fontisto name="bookmark" size={20} />
        </View>
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default NewestBooks;

const styles = StyleSheet.create({
  image: {
    height: RFValue(106),
    width: RFValue(72),
  },
  bookName: {
    fontFamily: "poppins600",
    fontSize: RFValue(16),
    lineHeight: RFValue(24),
    color: Colors.color1,
  },
  bookSubtitle: {
    fontFamily: "poppins500",
    fontSize: RFValue(12),
    paddingVertical: RFValue(5),
    lineHeight: RFValue(18),
    textAlign: "left",
    color: Colors.color1,
    opacity: 0.5,
  },
});
