import React from 'react';
import cx from 'classnames';
import { settings } from '~/config';

export function getStyles(data) {
  return {
    backgroundColor: data.backgroundColor,
    color: data.textColor,
    textAlign: data.textAlign,
    fontSize: data.fontSize,
    // fill in more
  };
}

export function getStyle(name) {
  const { pluggableStyles = [] } = settings;
  return pluggableStyles.find(({ id }) => id === name);
}

export default (props) => {
  const { data = {}, children } = props;
  const { style_name, align, size } = data;
  const style = getStyle(style_name);
  const ViewComponentWrapper = style?.viewComponent;

  return (
    <div
      className={cx('block align', style?.cssClass, align)}
      style={getStyles(data)}
    >
      <div
        className={cx({
          'full-width': align === 'full',
          large: size === 'l',
          medium: size === 'm',
          small: size === 's',
        })}
      >
        {ViewComponentWrapper ? <ViewComponentWrapper {...props} /> : children}
      </div>
    </div>
  );
};
