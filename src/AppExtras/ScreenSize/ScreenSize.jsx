/* eslint-disable no-extend-native */
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setScreen } from '@eeacms/volto-block-style/actions';
import { detectTouchScreen } from './utils';

const pixelToNumber = (pixel) => {
  return parseInt(pixel.replace('px', ''));
};

Number.prototype.toPixel = function toPixel() {
  return `${this}px`;
};

const debounce = (func) => {
  let timer;
  return (event) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 100, event);
  };
};

const ScreenSize = (props) => {
  const updateScreen = (e) => {
    const screenHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight ||
      0;
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth ||
      0;
    const headerWrapper = document.querySelector(
      '.header-wrapper:not(.mobile)',
    );
    const contentArea = document.querySelector('.ui.segment.content-area');
    const toolbar = document.querySelector('#toolbar .toolbar.expanded');
    const firstHeading = document.querySelector('.documentFirstHeading');
    const headerWrapperStyle = headerWrapper
      ? window.getComputedStyle(headerWrapper)
      : {};
    const contentAreaStyle =
      contentArea && !firstHeading
        ? window.getComputedStyle(contentArea)
        : { marginTop: '0px', paddingTop: '0px' };

    const offsetHeight =
      (headerWrapperStyle.display !== 'none'
        ? headerWrapper?.offsetHeight || 0
        : 0) +
      (pixelToNumber(contentAreaStyle.marginTop) +
        pixelToNumber(contentAreaStyle.paddingTop) || 0) +
      ((toolbar?.offsetHeight || 0) < screenHeight
        ? toolbar?.offsetHeight || 0
        : 0);
    const newScreen = {
      screenHeight,
      screenWidth,
      offsetHeight,
    };

    props.setScreen({ ...props.screen, ...newScreen });
  };

  React.useEffect(() => {
    if (__CLIENT__) {
      updateScreen();
<<<<<<< Updated upstream

      const IS_TOUCHSCREEN = detectTouchScreen();
      if (IS_TOUCHSCREEN) {
        window.addEventListener('orientationchange', function () {
          setTimeout(function () {
            updateScreen();
          }, 500);
        });
      } else {
        window.addEventListener('resize', updateScreen);
      }
    }
    return () => {
      if (__CLIENT__) {
        window.removeEventListener('resize', updateScreen);
        window.removeEventListener('orientationchange', updateScreen);
=======
      window.addEventListener('resize', debounce(updateScreen));
    }
    return () => {
      if (__CLIENT__) {
        window.removeEventListener('resize', debounce(updateScreen));
>>>>>>> Stashed changes
      }
    };
    /* eslint-disable-next-line */
  }, []);

  return '';
};

export default compose(
  connect(
    (state, props) => ({
      screen: state.screen,
    }),
    { setScreen },
  ),
)(ScreenSize);
