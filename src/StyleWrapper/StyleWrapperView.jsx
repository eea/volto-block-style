import React from 'react';
import cx from 'classnames';
import config from '@plone/volto/registry';
import { withScreenHeight } from '@eeacms/volto-block-style/hocs';

export function getInlineStyles(data, props = {}) {
  return {
    ...(data.backgroundColor ? { backgroundColor: data.backgroundColor } : {}),
    ...(data.textColor ? { color: data.textColor } : {}),
    ...(data.textAlign ? { textAlign: data.textAlign } : {}),
    ...(data.fontSize ? { fontSize: data.fontSize } : {}),
    ...(data.isScreenHeight ? { minHeight: props.screenHeight } : {}),
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
  } = styleData;
  const containerType = data['@type'];
  const backgroundImage = styleData.backgroundImage;

  const style = getStyle(style_name);
  const inlineStyles = getInlineStyles(styleData, props);
  const styled =
    Object.keys(inlineStyles).length > 0 ||
    backgroundImage ||
    style ||
    align ||
    size ||
    customClass ||
    isDropCap ||
    customId;

  const attrs = {
    style: inlineStyles,
    className: cx(style?.cssClass, customClass, align, {
      align,
      styled,
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
        {backgroundImage ? (
          <div
            className="bg"
            style={{
              backgroundImage: `url(${backgroundImage}/@@images/image`,
            }}
          />
        ) : (
          ''
        )}
        {ViewComponentWrapper ? <ViewComponentWrapper {...props} /> : children}
      </div>
    )
  ) : ViewComponentWrapper ? (
    <ViewComponentWrapper {...props} />
  ) : (
    children
  );
};

export default withScreenHeight(StyleWrapperView);
