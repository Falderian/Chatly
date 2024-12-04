const common = {
  danger: '#E94242',
  warning: '#FDCF41',
  success: '#2CC069',
  safe: '#7BCBCF',
  info: '#4098F7', // New - for informational alerts
  muted: '#6C757D', // New - for muted/disabled text
};

export const themeConfig = {
  light: {
    primary: '#002DE3',
    secondary: '#4C9AFF', // New - secondary brand color
    accent: '#FF8C00', // New - for call-to-action elements
    background: {
      primary: '#FFFFFF',
      secondary: '#F7F7FC',
      tertiary: '#E4E7EB', // New - subtle background contrast
    },
    border: {
      default: '#D1D9E6', // New - border for light theme
      focus: '#375FFF', // New - focus/active border
    },
    text: {
      default: '#0F1828',
      secondary: '#ADB5BD',
      highlight: '#002DE3', // New - for highlighted text
      muted: '#6C757D', // New - for subtle text
    },
    shadow: 'rgba(15, 24, 40, 0.1)', // New - shadow for components
    ...common,
  },
  dark: {
    primary: '#375FFF',
    secondary: '#5B8FFF', // New - secondary brand color
    accent: '#FF8C00', // New - for call-to-action elements
    background: {
      primary: '#0F1828',
      secondary: '#152033',
      tertiary: '#1F2A40', // New - subtle background contrast
    },
    border: {
      default: '#344051', // New - border for dark theme
      focus: '#375FFF', // New - focus/active border
    },
    text: {
      default: '#F7F7FC',
      secondary: '#ADB5BD',
      highlight: '#5B8FFF', // New - for highlighted text
      muted: '#6C757D', // New - for subtle text
    },
    shadow: 'rgba(15, 24, 40, 0.5)', // New - shadow for components
    ...common,
  },
};
