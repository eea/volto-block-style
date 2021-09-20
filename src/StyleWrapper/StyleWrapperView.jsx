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

const getSide = (side, v) =>
  `${v[side] ? `${v[side]}${v.unit ? v.unit : 'px'}` : '0px'}`;

const getSides = (v) => {
  return `${getSide('top', v)} ${getSide('right', v)} ${getSide(
    'bottom',
    v,
  )} ${getSide('left', v)}`;
};

const hexColorToRGB = (hex) => {
  const R = parseInt(hex.slice(1, 3), 16);
  const G = parseInt(hex.slice(3, 5), 16);
  const B = parseInt(hex.slice(5, 7), 16);
  return [R, G, B];
};

const h2rgb = (hex) => {
  if (!hex) return '0, 0, 0, ';
  const [R, G, B] = hexColorToRGB(hex);
  return `${R}, ${G}, ${B},`;
};

export function getInlineStyles(data, props = {}) {
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
            props.screen.height -
            props.screen.browserToolbarHeight -
            props.screen.content.offsetTop
          ).toPixel(),
        }
      : {}),
    ...(data.shadowDepth && {
      boxShadow: `0px 0px ${data.shadowDepth}px rgba(${h2rgb(
        data.shadowColor,
      )} ${(data.shadowDepth * 100) / 0.24})`,
    }),
    ...(data.margin && { margin: getSides(data.margin) }),
    ...(data.padding && { padding: getSides(data.padding) }),
    ...(data.borderRadius && {
      borderRadius: data.borderRadius,
    }),
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
