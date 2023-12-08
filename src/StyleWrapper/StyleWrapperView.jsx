import React from 'react';
import { Portal } from 'react-portal';
import { connect } from 'react-redux';
import cx from 'classnames';
import { BodyClass } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { withCachedImages } from '@eeacms/volto-block-style/hocs';
import { getFieldURL } from '@eeacms/volto-block-style/helpers';
import './stretchStyleDefaultView.css';
import './stretchStyleWideView.css';
import './stretchStyleEdit.css';

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

const getSide = (side, v) => {
  const v_unit = v.unit ? v.unit : 'px';
  return `${v[side] ? `${v[side]}${v_unit}` : '0px'}`;
};

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

function IsomorphicPortal({ children }) {
  const [isClient, setIsClient] = React.useState();
  React.useEffect(() => setIsClient(true), []);

  return isClient ? (
    <Portal node={document.getElementById('page-header')}>{children}</Portal>
  ) : (
    children
  );
}

export function getInlineStyles(data, props = {}) {
  return {
    ...(data.hidden && props.mode !== 'edit' ? { display: 'none' } : {}),
    ...(data.backgroundColor
      ? {
          backgroundColor: data.backgroundColor,
          '--background-color': data.backgroundColor,
        }
      : {}),
    ...(data.textColor
      ? { color: data.textColor, '--text-color': data.textColor }
      : {}),
    ...(data.textAlign ? { textAlign: data.textAlign } : {}),
    ...(data.fontSize
      ? { fontSize: data.fontSize, lineHeight: getLineHeight(data.fontSize) }
      : {}),
    ...(data.fontWeight ? { fontWeight: data.fontWeight } : {}),
    ...(data.height ? { height: data.height } : {}),
    ...(data.isScreenHeight && props.screen.height
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
    ...(data.clear && {
      clear: data.clear,
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
    theme,
    customId,
    isDropCap,
    isScreenHeight,
    useAsPageHeader = false,
    hidden = false,
    stretch,
  } = styleData;

  const containerType = data['@type'];
  const backgroundImage = getFieldURL(styleData.backgroundImage);

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
    theme ||
    isDropCap ||
    hidden ||
    customId ||
    stretch;

  const attrs = {
    style: inlineStyles,
    className: cx(
      `styled-${containerType}`,
      style?.cssClass,
      customClass,
      theme,
      align,
      props.className,
      {
        align,
        styled,
        'styled-with-bg': styleData.backgroundColor || backgroundImage,
        'screen-height': isScreenHeight,
        'full-width': align === 'full',
        stretch: stretch === 'stretch',
        large: size === 'l',
        medium: size === 'm',
        small: size === 's',
        'drop-cap': isDropCap,
      },
    ),
    id: customId,
    ...(props.role ? { role: props.role } : {}),
  };

  const nativeIntegration =
    mode === 'view' &&
    config.settings.integratesBlockStyles.includes(containerType);

  const children = nativeIntegration
    ? Object.keys(styleData).length > 0
      ? React.Children.map(props.children, (child) => {
          const childProps = { ...props, styling: attrs };
          if (React.isValidElement(child)) {
            return React.cloneElement(child, childProps);
          }
          return child;
        })
      : props.children
    : props.children;

  const ViewComponentWrapper = style?.viewComponent;
  const StyleWrapperRendered = styled ? (
    nativeIntegration && !style_name?.includes('content-box') ? (
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

  return useAsPageHeader ? (
    <React.Fragment>
      <BodyClass className="custom-page-header" />
      <IsomorphicPortal>{StyleWrapperRendered}</IsomorphicPortal>
    </React.Fragment>
  ) : (
    StyleWrapperRendered
  );
};

export default connect((state, props) => ({
  screen: state.screen,
}))(
  withCachedImages(StyleWrapperView, {
    getImage: (props) => props.styleData.backgroundImage || null,
  }),
);
