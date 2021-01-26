import {
  CompositeNavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BookType } from "./src/screens/HomePage/HomePage";

type SelectedBookType = {
  book: BookType;
};

export type ScreenStackParamList = {
  Login: undefined;
  HomePage: undefined;
  NotFound: undefined;
  SelectedBook: SelectedBookType;
};

export interface AppNavigationProps<
  // RouteName extends keyof ScreenStackParamList,
  ParamList extends ParamListBase
> {
  navigation: StackNavigationProp<ScreenStackParamList, any>;
  route: RouteProp<ParamList, any>;
}
