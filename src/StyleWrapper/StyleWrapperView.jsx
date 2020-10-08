import React from 'react';
import cx from 'classnames';
import { settings } from '~/config';

export function getInlineStyles(data) {
  return {
    ...(data.backgroundColor ? { backgroundColor: data.backgroundColor } : {}),
    ...(data.textColor ? { color: data.textColor } : {}),
    ...(data.textAlign ? { textAlign: data.textAlign } : {}),
    ...(data.fontSize ? { fontSize: data.fontSize } : {}),
    // fill in more
  };
}

export function getStyle(name) {
  const { pluggableStyles = [] } = settings;
  return pluggableStyles.find(({ id }) => id === name);
}

const StyleWrapperView = (props) => {
  const { data = {}, children } = props;
  const { style_name, align, size } = data;
  const style = getStyle(style_name);
  const inlineStyles = getInlineStyles(data);
  const ViewComponentWrapper = style?.viewComponent;

  return Object.keys(inlineStyles).length > 0 || style || align || size ? (
    <div
      className={cx('block styled', style?.cssClass, { align }, align)}
      style={inlineStyles}
    >
      {size ? (
        <div
          className={cx({
            'full-width': align === 'full',
            large: size === 'l',
            medium: size === 'm',
            small: size === 's',
          })}
        >
          {ViewComponentWrapper ? (
            <ViewComponentWrapper {...props} />
          ) : (
            children
          )}
        </div>
      ) : ViewComponentWrapper ? (
        <ViewComponentWrapper {...props} />
      ) : (
        children
      )}
    </div>
  ) : ViewComponentWrapper ? (
    <ViewComponentWrapper {...props} />
  ) : (
    children
  );
};

export default StyleWrapperView;
