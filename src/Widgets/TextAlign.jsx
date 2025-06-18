import alignLeftSVG from '@plone/volto/icons/align-left.svg';
import alignRightSVG from '@plone/volto/icons/align-right.svg';
import alignJustifySVG from '@plone/volto/icons/align-justify.svg';
import alignCenterSVG from '@plone/volto/icons/align-center.svg';
import { defineMessages } from 'react-intl';
import AlignWidget, { defaultActionsInfo } from './Align';

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
  justify: {
    id: 'Justify',
    defaultMessage: 'Justify',
  },
  '': {
    id: 'Clear selection',
    defaultMessage: 'Clear selection',
  },
});

defaultActionsInfo['left'] = [alignLeftSVG, messages.left];
defaultActionsInfo['right'] = [alignRightSVG, messages.right];
defaultActionsInfo['center'] = [alignCenterSVG, messages.center];
defaultActionsInfo['justify'] = [alignJustifySVG, messages.justify];


const TextAlign = (props) => {
  const actions = { actions: ['left', 'right', 'center', 'justify'] };
  return AlignWidget(props, actions);
};


export default TextAlign;
