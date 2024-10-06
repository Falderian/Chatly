/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const common = {
  danger: 'rgb(233, 66, 66)',
  warning: 'rgb(253, 207, 65)',
  success: 'rgb(44, 192, 105)',
  safe: 'rgb(123, 203, 207)',
  white: 'rgb(255, 255, 255)',
  line: 'rgb(237, 237, 237)',
};

export const Colors = {
  light: {
    text: 'rgb(27, 43, 72)',
    background: 'rgb(248, 247, 250)',
    tint: 'rgb(0, 45, 227)',
    icon: 'rgb(164, 164, 164)',
    tabIconDefault: 'rgb(164, 164, 164)',
    tabIconSelected: 'rgb(0, 45, 227)',
    pressed: 'rgb(0, 26, 131)',
    secondaryText: 'rgb(164, 164, 164)',
    disabled: 'rgb(173, 181, 189)',
    secondaryBackground: common.white,
    gradient1: 'rgb(135, 159, 255)',
    gradient2: 'rgb(210, 213, 249)',
    ...common,
  },
  dark: {
    text: common.white,
    background: 'rgb(15, 24, 40)',
    tint: common.white,
    icon: 'rgb(173, 181, 189)',
    tabIconDefault: 'rgb(173, 181, 189)',
    tabIconSelected: common.white,
    pressed: 'rgb(55, 95, 255)',
    secondaryText: 'rgb(164, 164, 164)',
    disabled: 'rgb(173, 181, 189)',
    secondaryBackground: 'rgb(21, 32, 51)',
    gradient1: 'rgb(135, 159, 255)',
    gradient2: 'rgb(210, 213, 249)',
    ...common,
  },
};
