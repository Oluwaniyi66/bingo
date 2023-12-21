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

export const haversine = (lat1, lon1, lat2 = 6.4706566, lon2 = 3.3789836) => {
  //lat2 and lon2 are the location of waste ground at Ijora  Olopa Lagos
  // Convert latitude and longitude from degrees to radians
  const toRadians = (angle) => (Math.PI / 180) * angle;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Radius of the Earth in kilometers (you can change this value if you need miles)
  const R = 6371;

  // Calculate the distance
  const distance = R * c;

  return distance;
};

export const calculatePrice = (
  distance,
  wasteType,
  weightCategory,
  sizeCategory
) => {
  let distancePrice = distance * 50;
  let wastePrice;
  let weightPrice;
  let sizePrice;

  switch (wasteType) {
    case "Organic":
      wastePrice = 165;
      break;
    case "Medical":
      wastePrice = 175;
      break;
    case "Fabrics":
      wastePrice = 150;
      break;
    case "Soil":
      wastePrice = 155;
      break;
    case "Metals":
      wastePrice = 200;
      break;
    case "Furnitures":
      wastePrice = 178;
      break;
    case "Electronics":
      wastePrice = 180;
      break;
    case "Wood":
      wastePrice = 176;
      break;
    case "Random (not inc Medical)":
      wastePrice = 150;
      break;
    case "General Home waste":
      wastePrice = 145;
      break;

    default:
      wastePrice = 165;
  }

  switch (weightCategory) {
    case "1 - 10":
      weightPrice = 450;
      break;
    case "11 - 25":
      weightPrice = 650;
      break;
    case "26 - 40":
      weightPrice = 850;
      break;
    case "41 - 65":
      weightPrice = 1050;
      break;
    case "66 - 80":
      weightPrice = 1200;
      break;
    case "81 - 150":
      weightPrice = 1450;
      break;
    case "151 - 250":
      weightPrice = 1750;
      break;
    case "250+":
      weightPrice = 2050;
      break;
    default:
      weightPrice = 450;
  }

  switch (sizeCategory) {
    case "1 - 2":
      sizePrice = 650;
      break;
    case "3 - 5":
      sizePrice = 950;
      break;
    case "6 - 10":
      sizePrice = 1150;
      break;
    case "11 - 25":
      sizePrice = 1350;
      break;
    case "26 - 40":
      sizePrice = 1500;
      break;
    case "41 - 70":
      sizePrice = 1700;
      break;
    case "71 - 120":
      sizePrice = 1900;
      break;
    case "120+":
      sizePrice = 2150;
      break;
    default:
      sizePrice = 650; // Default price if waste type is not matched
  }

  const totalPrice = distancePrice + wastePrice + weightPrice + sizePrice;

  return totalPrice.toFixed(2);
};
