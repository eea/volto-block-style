/**
 * AlignWidget component.
 * To benefit from styling integration, use with a field named 'align'
 * @module components/manage/Widgets/AlignWidget
 */

import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { FormFieldWrapper, Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import imageLeftSVG from '@plone/volto/icons/image-left.svg';
import imageRightSVG from '@plone/volto/icons/image-right.svg';
import imageFitSVG from '@plone/volto/icons/image-fit.svg';
import imageNarrowSVG from '@eeacms/volto-block-style/icons/image-narrow.svg';
import imageWideSVG from '@plone/volto/icons/image-wide.svg';
import imageFullSVG from '@plone/volto/icons/image-full.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

export const messages = defineMessages({
  left: {
    id: 'Left',
    defaultMessage: 'Left',
  },
  right: {
    id: 'Right',
    defaultMessage: 'Right',
  },
  center: {
    id: 'Center',
    defaultMessage: 'Center',
  },
  narrow: {
    id: 'Narrow',
    defaultMessage: 'Narrow',
  },
  wide: {
    id: 'Wide',
    defaultMessage: 'Wide',
  },
  full: {
    id: 'Full',
    defaultMessage: 'Full',
  },
  '': {
    id: 'None',
    defaultMessage: 'None',
  },
});

export const defaultActionsInfo = {
  left: [imageLeftSVG, messages.left],
  right: [imageRightSVG, messages.right],
  center: [imageFitSVG, messages.center],
  narrow: [imageNarrowSVG, messages.narrow],
  wide: [imageWideSVG, messages.wide],
  full: [imageFullSVG, messages.full],
  '': [clearSVG, messages['']],
};

const AlignWidget = (props, rest) => {
  const intl = useIntl();

  const {
    id,
    onChange,
    actions = rest.actions || ['left', 'right', 'center', 'full'],
    actionsInfoMap = {},
    defaultAction = '',
    value,
  } = props;

  React.useEffect(() => {
    if (!props.value && props.default) {
      props.onChange(props.id, props.default);
    }
  });

  // add clear selection button to the actions mapping if it's not already present
  if (actions[actions.length - 1] !== '') {
    actions.push('');
  }

  const actionsInfo = {
    ...defaultActionsInfo,
    ...actionsInfoMap,
  };

  return (
    <FormFieldWrapper {...props} className="align-widget">
      <div className="align-buttons">
        {actions.map((action) => {
          const action_info_list = actionsInfo[action];
          const title = action_info_list[1];
          return (
            <Button.Group key={action}>
              <Button
                icon
                basic
                aria-label={action}
                onClick={() => onChange(id, action)}
                active={
                  (action === defaultAction && !value) || value === action
                }
              >
                <Icon
                  name={action_info_list[0]}
                  title={
                    title
                      ? typeof title === 'string'
                        ? title
                        : intl.formatMessage(title)
                      : action
                  }
                  size="24px"
                />
              </Button>
            </Button.Group>
          );
        })}
      </div>
    </FormFieldWrapper>
  );
};

export default AlignWidget;
