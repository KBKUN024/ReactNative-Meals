import { StyleSheet, Pressable } from "react-native";
import { cardShadow } from "../styles/commonStyles";

/**
 * 带有视觉反馈的可按压组件
 * 自动处理 Android ripple 效果和 iOS 按压反馈
 * 
 * @param {Object} props - 组件属性
 * @param {React.ReactNode} props.children - 子组件
 * @param {Function} props.onPress - 按压回调
 * @param {Object} props.style - 自定义样式（会与容器样式合并）
 * @param {number} props.pressedOpacity - iOS 按压时的透明度 (默认: 0.5)
 * @param {string} props.rippleColor - Android ripple 颜色 (默认: #f3ededff)
 * @param {boolean} props.disabled - 是否禁用
 * @param {Object} props.androidRippleConfig - Android ripple 自定义配置
 * @param {Object} props.pressStyle - 按压时的自定义样式
 * 
 * @example
 * <PressFeedback onPress={() => {}}>
 *   <Text>Press me</Text>
 * </PressFeedback>
 */
export function PressFeedback({
  children,
  onPress,
  style,
  pressedOpacity = 0.8,
  rippleColor = "rgba(220, 238, 254, 0.32)",
  disabled = false,
  androidRippleConfig = {},
  pressStyle,
  ...otherProps
}) {
  const defaultRippleConfig = {
    color: rippleColor,
    foreground: true,
    borderless: true,
    ...androidRippleConfig,
  };

  return (
    <Pressable
      android_ripple={defaultRippleConfig}
      style={({ pressed }) => [
        styles.pressableContainer,
        style,
        pressed && !disabled ? (pressStyle || { opacity: pressedOpacity }) : null,
      ]}
      onPress={onPress}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    ...cardShadow,
  },
});
