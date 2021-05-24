import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import config from '@plone/volto/registry';
import { withCachedImages } from '@eeacms/volto-block-style/hocs';

const getLineHeight = (fontSize) => {
  switch (fontSize) {
    case 'large':
      return '110%';
    case 'x-large':
      return '130%';
    default:
      return;
  }
};

export function getInlineStyles(data, props = {}) {
  // console.log('props', props);
  return {
    ...(data.hidden && props.mode !== 'edit' ? { display: 'none' } : {}),
    ...(data.backgroundColor ? { backgroundColor: data.backgroundColor } : {}),
    ...(data.textColor ? { color: data.textColor } : {}),
    ...(data.textAlign ? { textAlign: data.textAlign } : {}),
    ...(data.fontSize
      ? { fontSize: data.fontSize, lineHeight: getLineHeight(data.fontSize) }
      : {}),
    ...(data.isScreenHeight && props.screen.screenHeight
      ? {
          minHeight: (
            props.screen.screenHeight - props.screen.offsetHeight
          ).toPixel(),
        }
      : {}),
    // fill in more
  };
}

export function getStyle(name) {
  const { pluggableStyles = [] } = config.settings;
  return pluggableStyles.find(({ id }) => id === name);
}

const StyleWrapperView = (props) => {
  const { styleData = {}, data = {}, mode = 'view' } = props;
  const {
    style_name,
    align,
    size,
    customClass,
    customId,
    isDropCap,
    isScreenHeight,
    hidden = false,
  } = styleData;
  const containerType = data['@type'];
  const backgroundImage = styleData.backgroundImage;

  const style = getStyle(style_name);
  const inlineStyles = getInlineStyles(styleData, props);
  const styled =
    props.styled ||
    Object.keys(inlineStyles).length > 0 ||
    backgroundImage ||
    style ||
    align ||
    size ||
    customClass ||
    isDropCap ||
    hidden ||
    customId;

  const attrs = {
    style: inlineStyles,
    className: cx(style?.cssClass, customClass, align, {
      align,
      styled,
      'styled-with-bg': styleData.backgroundColor || backgroundImage,
      'screen-height': isScreenHeight,
      'full-width': align === 'full',
      large: size === 'l',
      medium: size === 'm',
      small: size === 's',
      'drop-cap': isDropCap,
    }),
    id: customId,
    ...(props.role ? { role: props.role } : {}),
  };

  const nativeIntegration =
    mode === 'view' &&
    config.settings.integratesBlockStyles.includes(containerType);

  const children = nativeIntegration
    ? React.Children.map(props.children, (child) => {
        const childProps = { ...props, styling: attrs };
        if (React.isValidElement(child)) {
          return React.cloneElement(child, childProps);
        }
        return child;
      })
    : props.children;

  const ViewComponentWrapper = style?.viewComponent;

  return styled ? (
    nativeIntegration ? (
      children
    ) : (
      <div {...attrs} ref={props.setRef}>
        {Object.keys(props.images || {}).map((bgImage) => (
          <img
            key={`styled-bg-image-${bgImage}`}
            alt=""
            src={props.images[bgImage]?.src}
            className={cx('bg', {
              hidden:
                backgroundImage !== bgImage || !props.images[bgImage]?.src,
            })}
          />
        ))}

        {ViewComponentWrapper ? <ViewComponentWrapper {...props} /> : children}
      </div>
    )
  ) : ViewComponentWrapper ? (
    <ViewComponentWrapper {...props} />
  ) : (
    children
  );
};

export default connect((state, props) => ({
  screen: state.screen,
}))(
  withCachedImages(StyleWrapperView, {
    getImage: (props) => props.styleData.backgroundImage || null,
  }),
);
