import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SkeletonContent from "react-native-skeleton-content";
import Colors from "../constants/Colors";
import { BookType } from "../screens/HomePage/HomePage";
import { RFValue } from "../Utils/Utils";

interface Props {
  book: BookType;
  onPress: (book: BookType) => void;
  isLoading: boolean;
}

const BookView = ({ book, onPress, isLoading }: Props) => {
  return (
    <React.Fragment>
      <TouchableOpacity
        style={{ flexDirection: "column", marginHorizontal: 10 }}
        onPress={() => onPress(book)}
      >
        <View>
          <Image source={{ uri: book.image }} style={styles.image} />
          <Text style={styles.bookName}>
            {book.title.substring(0, 30) +
              `${book.title.length > 30 ? "..." : ""}`}{" "}
          </Text>
          <Text style={styles.bookSubtitle}>
            {book.subtitle.substring(0, 30) +
              `${book.subtitle.length > 30 ? "..." : ""}`}{" "}
          </Text>
        </View>
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default BookView;

const styles = StyleSheet.create({
  image: {
    width: RFValue(126),
    height: RFValue(192),
    resizeMode: "cover",
    borderWidth: 0,
  },
  bookName: {
    width: RFValue(100),
    fontFamily: "poppins600",
    fontSize: RFValue(16),
    lineHeight: RFValue(24),
    color: Colors.color1,
  },
  bookSubtitle: {
    fontFamily: "poppins500",
    width: RFValue(126),
    fontSize: RFValue(12),
    paddingVertical: RFValue(5),
    lineHeight: RFValue(18),
    color: Colors.color1,
    opacity: 0.5,
  },
});
