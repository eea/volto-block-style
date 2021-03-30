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
        const headerWrapper = document.querySelector(
          '.header-wrapper:not(.mobile)',
        );
        const contentArea = document.querySelector('.ui.segment.content-area');
        const toolbar = document.querySelector('#toolbar .toolbar.expanded');
        const firstHeading = document.querySelector('.documentFirstHeading');
        // const view = document.querySelector(
        //   '.ui.segment.content-area #view #page-document',
        // );
        // let childNth = 0;

        // if (view) {
        //   view.childNodes.forEach((child, index) => {
        //     if (child === styleWrapper.current) {
        //       childNth = index;
        //     }
        //   });
        // }

        const screenHeight =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight ||
          0;

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

        setOffsetHeight(offsetHeight);
        setScreenHeight(screenHeight);
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
