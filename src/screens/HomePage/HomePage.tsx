import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppNavigationProps } from "../../../types";
import bookApi from "../../api/bookApi";
import BookView from "../../components/BookView";
import LoadingView from "../../components/LoadingView";
import NavBar from "../../components/NavBar";
import NewestBooks from "../../components/NewestBooks";
import Colors from "../../constants/Colors";
import { displayError, RFValue } from "../../Utils/Utils";
import SkeletonContent from "react-native-skeleton-content";

// Expected book object from api
export interface BookType {
  title: string;
  subtitle: string;
  price: string;
  image: string;
  isbn13: string;
  authors: string;
  desc: string;
  rating: number;
  pdf:any;
}

const { width } = Dimensions.get("window");

const HomePage = ({ navigation }: AppNavigationProps<any>) => {
  const [books, setBooks] = React.useState<BookType[]>([]);
  const [newBooks, setNewBooks] = React.useState<BookType[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // Make api request to fetch books
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await bookApi.get("/search/fashion");
        const { data: newBook } = await bookApi.get("/new");
        setBooks(data.books);
        setNewBooks(newBook.books);
        setIsLoading(false);
      } catch (error) {
        displayError(error.message);
        setIsLoading(false);
      }
    })();
  }, []);

  const onPressBook = (book: BookType) => {
    navigation.navigate("SelectedBook", { book: book });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View style={styles.headerItems}>
            <View style={styles.imgAndText}>
              <Image
                source={require("../../assets/img/camera_boy.png")}
                style={{
                  width: RFValue(40),
                  height: RFValue(40),
                }}
              />
              <Text style={styles.dustin}>Hi, Dustin!</Text>
            </View>
            <Feather name="search" size={25} />
          </View>
        </View>
        <View>
          <Text style={styles.popularBooks}>Popular Books</Text>
        </View>
        <View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {isLoading && (
              <>
                <SkeletonContent
                  containerStyle={{ width: 130 }}
                  animationDirection="horizontalLeft"
                  isLoading={isLoading}
                  layout={[
                    {
                      key: "4",
                      width: RFValue(126),
                      height: 200,
                      marginBottom: 6,
                    },
                    {
                      key: "5",
                      width: RFValue(100),
                      height: 20,
                      marginBottom: 6,
                    },
                    {
                      key: "6",
                      width: RFValue(100),
                      height: 20,
                      marginBottom: 6,
                    },
                  ]}
                />
                <SkeletonContent
                  containerStyle={{ width: 300 }}
                  animationDirection="horizontalLeft"
                  isLoading={isLoading}
                  layout={[
                    {
                      key: "1",
                      width: RFValue(126),
                      height: 200,
                      marginBottom: 6,
                    },
                    {
                      key: "2",
                      width: RFValue(100),
                      height: 20,
                      marginBottom: 6,
                    },
                    {
                      key: "3",
                      width: RFValue(100),
                      height: 20,
                      marginBottom: 6,
                    },
                  ]}
                />
              </>
            )}
            {books.map((book, idx) => {
              return (
                <React.Fragment key={idx}>
                  <BookView
                    book={book}
                    onPress={onPressBook}
                    isLoading={isLoading}
                  />
                </React.Fragment>
              );
            })}
          </ScrollView>
          <View>
            <Text style={styles.popularBooks}>Newest</Text>
          </View>
          <View>
            {isLoading && (
              <SkeletonContent
                containerStyle={{ width: 300 }}
                animationDirection="horizontalLeft"
                isLoading={isLoading}
                layout={[
                  {
                    key: "7",
                    width: width - RFValue(60),
                    height: 100,
                    marginBottom: 6,
                  },
                  {
                    key: "8",
                    width: width - RFValue(60),
                    height: 100,
                    marginBottom: 6,
                  },
                ]}
              />
            )}
            {newBooks.map((book, idx) => {
              return (
                <View key={idx}>
                  <NewestBooks book={book} onPress={onPressBook} />
                </View>
              );
            })}
          </View>
        </View>
        <LoadingView shown={isLoading} />
      </ScrollView>
      <View style={{ backgroundColor: "transparent", marginBottom: 20 }}>
        <NavBar />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: RFValue(30),
    flex: 1,
    backgroundColor: Colors.pageBg,
  },
  headerItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imgAndText: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerContainer: {
    paddingTop: RFValue(30),
  },
  dustin: {
    paddingLeft: RFValue(12),
    fontFamily: "poppins600",
    color: Colors.color1,
  },
  popularBooks: {
    fontFamily: "poppins600",
    fontSize: RFValue(24),
    paddingTop: RFValue(35),
    paddingBottom: RFValue(20),
    color: Colors.color1,
    lineHeight: 16,
  },
});
