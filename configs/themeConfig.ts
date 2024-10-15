const common = {
  danger: '#E94242',
  warning: '#FDCF41',
  success: '#2CC069',
  safe: '#7BCBCF',
};

export const themeConfig = {
  light: {
    primary: '#002DE3',
    background: {
      primary: '#FFFFFF',
      secondary: '#F7F7FC',
    },
    text: {
      default: '#0F1828',
      secondary: '#ADB5BD',
    },
    ...common,
  },
  dark: {
    primary: '#375FFF',
    background: {
      primary: '#0F1828',
      secondary: '#152033',
    },
    text: {
      default: '#F7F7FC',
      secondary: '#ADB5BD',
    },
    ...common,
  },
};
