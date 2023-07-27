import { defineMessages } from 'react-intl';
import config from '@plone/volto/registry';

const messages = defineMessages({
  stylesBlock: {
    id: 'styles-block',
    defaultMessage: 'Styles',
  },
  default: {
    id: 'fieldsets-default',
    defaultMessage: 'Default',
  },
  presets: {
    id: 'fieldsets-presets',
    defaultMessage: 'Preset styles',
  },
  standard: {
    id: 'fieldsets-standard',
    defaultMessage: 'Standard',
  },
  decorations: {
    id: 'fieldsets-decorations',
    defaultMessage: 'Decorations',
  },
  layout: {
    id: 'fieldsets-layout',
    defaultMessage: 'Layout',
  },
  advanced: {
    id: 'fieldsets-advanced',
    defaultMessage: 'Advanced',
  },
  pThemeTitle: {
    id: 'properties-theme-title',
    defaultMessage: 'Theme',
  },
  pThemeDescription: {
    id: 'properties-theme-description',
    defaultMessage: 'A predefined theme, applicable just to this block',
  },
  pStyleName: {
    id: 'properties-style-name',
    defaultMessage: 'Style',
  },
  pTextAlign: {
    id: 'properties-text-align',
    defaultMessage: 'Text align',
  },
  pAlign: {
    id: 'properties-align',
    defaultMessage: 'Align',
  },
  pStretch: {
    id: 'properties-stretch',
    defaultMessage: 'Stretch',
  },
  pFontSizeTitle: {
    id: 'properties-font-size-title',
    defaultMessage: 'Font size',
  },
  pFontSizeDescription: {
    id: 'properties-font-size-description',
    defaultMessage: 'Relative to normal size of text in the block',
  },
  pFontWeightTitle: {
    id: 'properties-font-weight-title',
    defaultMessage: 'Font weight',
  },
  pFontWeightDescription: {
    id: 'properties-font-weight-description',
    defaultMessage: 'The weight (or boldness) of the font',
  },
  pMargin: {
    id: 'properties-margin',
    defaultMessage: 'Margin',
  },
  pPadding: {
    id: 'properties-padding',
    defaultMessage: 'Padding',
  },
  pSize: {
    id: 'properties-size',
    defaultMessage: 'Box size',
  },
  pHeightTitle: {
    id: 'properties-height-title',
    defaultMessage: 'Element height',
  },
  pHeightDescription: {
    id: 'properties-height-description',
    defaultMessage: 'Element height, expressed as CSS dimension',
  },
  pIsScreenHeightTitle :{
    id: 'properties-is-screen-height-title',
    defaultMessage: 'Screen height',
  },
  pIsScreenHeightDescription :{
    id: 'properties-is-screen-height-description',
    defaultMessage: 'Maximize block to viewport height',
  },
  pBackgroundImage: {
    id: 'properties-background-image',
    defaultMessage: 'Background image',
  },
  pBackgroundColor: {
    id: 'properties-background-color',
    defaultMessage: 'Background color',
  },
  pTextColor: {
    id: 'properties-text-color',
    defaultMessage: 'Text color',
  },
  pCustomClassTitle: {
    id: 'properties-custom-class-title',
    defaultMessage: 'Custom CSS Class',
  },
  pCustomClassDescription: {
    id: 'properties-custom-class-description',
    defaultMessage: 'A custom CSS class, applicable just to this block',
  },
  pCustomIdTitle: {
    id: 'properties-custom-id-title',
    defaultMessage: 'Custom Id',
  },
  pCustomIdDescription: {
    id: 'properties-custom-id-description',
    defaultMessage: 'A custom id, applicable just to this block',
  },
  pIsDropCapTitle: {
    id: 'properties-is-drop-cap-title',
    defaultMessage: 'Drop cap',
  },
  pIsDropCapDescription: {
    id: 'properties-is-drop-cap-description',
    defaultMessage: 'First letter is styled as a drop cop',
  },
  pHiddenTitle: {
    id: 'properties-hidden-title',
    defaultMessage: 'Hidden',
  },
  pHiddenDescription: {
    id: 'properties-hidden-description',
    defaultMessage: 'Hide this bloc',
  },
  pShadowDepth: {
    id: 'properties-shadow-depth',
    defaultMessage: 'Shadow depth',
  },
  pShadowColor: {
    id: 'properties-shadow-color',
    defaultMessage: 'Shadow color',
  },
  pBorderRadius: {
    id: 'properties-border-radius',
    defaultMessage: 'Rounded Corner',
  },
  pClearTitle: {
    id: 'properties-clear-title',
    defaultMessage: 'Clear floats',
  },
  pClearDescription: {
    id: 'properties-clear-description',
    defaultMessage: 'Pushes selected block under floated content',
  },
});

export const StyleSchema = (props) => {
  const { intl } = props;
  return {
    title: intl.formatMessage(messages.stylesBlock),
    fieldsets: [
      {
        id: 'default',
        title: intl.formatMessage(messages.default),
        fields: [],
      },
      {
        id: 'presets',
        title: intl.formatMessage(messages.presets),
        fields: ['style_name'],
      },
      {
        id: 'standard',
        title: intl.formatMessage(messages.standard),
        fields: [
          'textAlign',
          'fontSize',
          'fontWeight',
          'align',
          'stretch',
          'size',
          'isDropCap',
        ],
      },
      {
        id: 'decorations',
        title: intl.formatMessage(messages.decorations),
        fields: [
          'backgroundImage',
          'backgroundColor',
          'textColor',
          'borderRadius',
          'shadowDepth',
          'shadowColor',
        ],
      },
      {
        id: 'layout',
        title: intl.formatMessage(messages.layout),
        fields: ['margin', 'padding', 'size', 'align', 'stretch'], // todo: width, conflicts with size
      },
      {
        id: 'advanced',
        title: intl.formatMessage(messages.advanced),
        fields: [
          'theme',
          'hidden',
          'height',
          'isScreenHeight',
          'customClass',
          'customId',
          'clear',
        ],
      },
    ],
    properties: {
      theme: {
        title: intl.formatMessage(messages.pThemeTitle),
        description: intl.formatMessage(messages.pThemeDescription),
        widget: 'theme_picker',
        colors: [
          ...(config.settings && config.settings.themeColors
            ? config.settings.themeColors.map(({ value, title }) => ({
                name: value,
                label: title,
              }))
            : []),
        ],
      },
      style_name: {
        title: intl.formatMessage(messages.pStyleName),
        widget: 'style_select',
      },
      textAlign: {
        title: intl.formatMessage(messages.pTextAlign),
        widget: 'style_text_align',
      },
      align: {
        title: intl.formatMessage(messages.pAlign),
        widget: 'style_align',
      },
      stretch: {
        title: intl.formatMessage(messages.pStretch),
        widget: 'style_stretch',
      },
      fontSize: {
        title: intl.formatMessage(messages.pFontSizeTitle),
        description: intl.formatMessage(messages.pFontSizeDescription),
        choices: [
          ['xx-small', 'xx-small'],
          ['x-small', 'x-small'],
          ['small', 'small'],
          ['medium', 'medium'],
          ['large', 'large'],
          ['x-large', 'x-large'],
          ['xx-large', 'xx-large'],
          ['xxx-large', 'xxx-large'],
        ],
      },
      fontWeight: {
        title: intl.formatMessage(messages.pFontWeightTitle),
        description: intl.formatMessage(messages.pFontWeightDescription),
        choices: [
          ['300', 'Light'],
          ['400', 'Regular'],
          ['500', 'Medium'],
          ['600', 'SemiBold'],
          ['700', 'Bold'],
        ],
      },
      margin: {
        title: intl.formatMessage(messages.pMargin),
        widget: 'quad_size',
      },
      padding: {
        title: intl.formatMessage(messages.pPadding),
        widget: 'quad_size',
      },
      size: {
        title: intl.formatMessage(messages.pSize),
        widget: 'style_size',
      },
      height: {
        title: intl.formatMessage(messages.pHeightTitle),
        widget: 'text',
        description: intl.formatMessage(messages.pHeightDescription),
      },
      isScreenHeight: {
        title: intl.formatMessage(messages.pIsScreenHeightTitle),
        description: intl.formatMessage(messages.pIsScreenHeightDescription),
        type: 'boolean',
      },
      backgroundImage: {
        title: intl.formatMessage(messages.pBackgroundImage),
        widget: 'url',
      },
      backgroundColor: {
        title: intl.formatMessage(messages.pBackgroundColor),
        type: 'color',
        widget: 'style_simple_color',
        available_colors: config.settings.available_colors,
      },
      textColor: {
        title: intl.formatMessage(messages.pTextColor),
        type: 'color',
        widget: 'style_simple_color',
        available_colors: config.settings.available_colors,
      },
      customClass: {
        title: intl.formatMessage(messages.pCustomClassTitle),
        description: intl.formatMessage(messages.pCustomClassDescription),
      },
      customId: {
        title: intl.formatMessage(messages.pCustomIdTitle),
        description: intl.formatMessage(messages.pCustomIdDescription),
      },
      isDropCap: {
        title: intl.formatMessage(messages.pIsDropCapTitle),
        description: intl.formatMessage(messages.pIsDropCapDescription),
        type: 'boolean',
      },
      hidden: {
        title: intl.formatMessage(messages.pHiddenTitle),
        description: intl.formatMessage(messages.pHiddenDescription),
        type: 'boolean',
      },
      shadowDepth: {
        widget: 'slider',
        title: intl.formatMessage(messages.pShadowDepth),
        settings: {
          min: 0,
          max: 24,
          step: 1,
          start: 0,
        },
      },
      shadowColor: {
        title: intl.formatMessage(messages.pShadowColor),
        type: 'color',
        widget: 'style_simple_color',
        available_colors: config.settings.available_colors,
      },
      borderRadius: {
        widget: 'slider',
        title: intl.formatMessage(messages.pBorderRadius),
        settings: {
          min: 0,
          max: 24,
          step: 1,
          start: 0,
        },
      },
      clear: {
        title: intl.formatMessage(messages.pClearTitle),
        description: intl.formatMessage(messages.pClearDescription),
        choices: [
          [null, 'None'],
          ['left', 'Left'],
          ['right', 'Right'],
          ['both', 'Both'],
        ],
      },
    },
    required: [],
  };
};
