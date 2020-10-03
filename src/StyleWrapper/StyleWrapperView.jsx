import React from 'react';
import cx from 'classnames';
import { settings } from '~/config';

export function getStyles(data) {
  return {
    backgroundColor: data.backgroundColor,
    color: data.textColor,
    textAlign: data.textAlign,
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
  const ViewWrapper = style?.viewComponent;

  return (
    <div
      className={cx(
        'align',
        style?.cssClass,
        {
          center: !Boolean(align),
        },
        align,
      )}
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
        {ViewWrapper ? <ViewWrapper {...props} /> : children}
      </div>
    </div>
  );
};
