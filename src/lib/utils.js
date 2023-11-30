import { Dimensions, Platform } from "react-native";

const Screen = Dimensions.get("window");
export const SCREEN_WIDTH = Screen.width;
export const SCREEN_HEIGHT = Screen.height;
export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const isMWeb = Platform.OS === "web";
export const isIPad = Platform.isPad;
export const currentPlatform = Platform.OS;

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };
