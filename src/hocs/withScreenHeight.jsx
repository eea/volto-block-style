import React from 'react';

const pixelToNumber = (pixel) => {
  return parseInt(pixel.replace('px', ''));
};

export default function withScreenHeight(WrappedComponent) {
  return (props) => {
    const styleWrapper = React.useRef(null);
    const [screenHeight, setScreenHeight] = React.useState(null);
    const [offsetHeight, setOffsetHeight] = React.useState(null);
    const isScreenHeight = props.styleData.isScreenHeight;

    const updateHeight = () => {
      if (__CLIENT__) {
        const headerWrapper = document.querySelector('.header-wrapper');
        const contentArea = document.querySelector('.ui.segment.content-area');
        const view = document.querySelector(
          '.ui.segment.content-area #view #page-document',
        );
        let childNth = 0;

        if (view) {
          view.childNodes.forEach((child, index) => {
            if (child === styleWrapper.current) {
              childNth = index;
            }
          });
        }
        const contentAreaStyle =
          contentArea && childNth < 2
            ? window.getComputedStyle(contentArea)
            : { marginTop: '0px', paddingTop: '0px' };
        const offsetHeight =
          childNth < 2
            ? (headerWrapper?.offsetHeight || 0) +
              (pixelToNumber(contentAreaStyle.marginTop) +
                pixelToNumber(contentAreaStyle.paddingTop) || 0)
            : 0;

        setOffsetHeight(offsetHeight || 0);
        setScreenHeight(window.innerHeight);
      }
    };

    React.useEffect(() => {
      if (isScreenHeight) {
        updateHeight();
        window.addEventListener('resize', updateHeight);
      }
      return () => {
        if (isScreenHeight) {
          window.removeEventListener('resize', updateHeight);
        }
      };
      /* eslint-disable-next-line */
    }, [isScreenHeight]);

    const getScreenHeight = () => {
      if (!screenHeight) return null;
      return `${screenHeight - offsetHeight}px`;
    };

    return (
      <WrappedComponent
        {...props}
        screenHeight={getScreenHeight()}
        setRef={(ref) => {
          styleWrapper.current = ref;
        }}
      />
    );
  };
}
