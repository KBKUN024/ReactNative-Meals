import { Platform } from "react-native";

/**
 * 卡片阴影样式 - 适用于 Android 和 iOS
 * 用于任何需要立体感的卡片组件
 */
export const cardShadow = {
  elevation: 4, // Android shadow
  shadowColor: "black", // iOS shadow
  shadowOpacity: 0.25,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
  overflow: Platform.OS === "android" ? "hidden" : "",
};

/**
 * 轻微阴影 - 用于微妙的立体效果
 */
export const lightShadow = {
  elevation: 2,
  shadowColor: "black",
  shadowOpacity: 0.15,
  shadowOffset: { width: 0, height: 1 },
  shadowRadius: 2,
  overflow: Platform.OS === "android" ? "hidden" : "",
};

/**
 * 深阴影 - 用于突出的组件
 */
export const deepShadow = {
  elevation: 8,
  shadowColor: "black",
  shadowOpacity: 0.35,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 8,
  overflow: Platform.OS === "android" ? "hidden" : "",
};
