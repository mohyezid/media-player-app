import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { colors } from "./token";

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.background,
  },

  headerLargeTitle: false,

  headerLargeStyle: {
    backgroundColor: colors.background,
  },
  headerLargeTitleStyle: {
    color: colors.text,
  },
  headerTintColor: colors.text,

  headerTransparent: false,

  headerBlurEffect: "prominent",
  headerShadowVisible: false,
};
