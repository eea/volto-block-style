export const setScreen = (screen = {}) => {
  return {
    type: 'SET_SCREEN',
    screen,
  };
};
