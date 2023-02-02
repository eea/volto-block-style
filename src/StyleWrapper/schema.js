import config from '@plone/volto/registry';

export const StyleSchema = () => {
  return {
    title: 'Styles',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [],
      },
      {
        id: 'presets',
        title: 'Preset styles',
        fields: ['style_name'],
      },
      {
        id: 'standard',
        title: 'Standard',
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
        title: 'Decorations',
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
        title: 'Layout',
        fields: ['margin', 'padding', 'size', 'align', 'stretch'], // todo: width, conflicts with size
      },
      {
        id: 'advanced',
        title: 'Advanced',
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
        title: 'Theme',
        description: 'A predefined theme, applicable just to this block',
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
        title: 'Style',
        widget: 'style_select',
      },
      textAlign: {
        title: 'Text align',
        widget: 'style_text_align',
      },
      align: {
        title: 'Align',
        widget: 'style_align',
      },
      stretch: {
        title: 'Stretch',
        widget: 'style_stretch',
      },
      fontSize: {
        title: 'Font size',
        description: 'Relative to normal size of text in the block',
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
        title: 'Font weight',
        description: 'The weight (or boldness) of the font',
        choices: [
          ['300', 'Light'],
          ['400', 'Regular'],
          ['500', 'Medium'],
          ['600', 'SemiBold'],
          ['700', 'Bold'],
        ],
      },
      margin: {
        title: 'Margin',
        widget: 'quad_size',
      },
      padding: {
        title: 'Padding',
        widget: 'quad_size',
      },
      size: {
        title: 'Box size',
        widget: 'style_size',
      },
      height: {
        title: 'Element height',
        widget: 'text',
        description: 'Element height, expressed as CSS dimension',
      },
      isScreenHeight: {
        title: 'Screen height',
        description: 'Maximize block to viewport height',
        type: 'boolean',
      },
      backgroundImage: {
        title: 'Background image',
        widget: 'url',
      },
      backgroundColor: {
        title: 'Background color',
        type: 'color',
        widget: 'style_simple_color',
        available_colors: config.settings.available_colors,
      },
      textColor: {
        title: 'Text color',
        type: 'color',
        widget: 'style_simple_color',
        available_colors: config.settings.available_colors,
      },
      customClass: {
        title: 'Custom CSS Class',
        description: 'A custom CSS class, applicable just to this block',
      },
      customId: {
        title: 'Custom Id',
        description: 'A custom id, applicable just to this block',
      },
      isDropCap: {
        title: 'Drop cap',
        description: 'First letter is styled as a drop cop',
        type: 'boolean',
      },
      hidden: {
        title: 'Hidden',
        description: 'Hide this block',
        type: 'boolean',
      },
      shadowDepth: {
        widget: 'slider',
        title: 'Shadow depth',
        settings: {
          min: 0,
          max: 24,
          step: 1,
          start: 0,
        },
      },
      shadowColor: {
        title: 'Shadow color',
        type: 'color',
        widget: 'style_simple_color',
        available_colors: config.settings.available_colors,
      },
      borderRadius: {
        widget: 'slider',
        title: 'Rounded Corner',
        settings: {
          min: 0,
          max: 24,
          step: 1,
          start: 0,
        },
      },
      clear: {
        title: 'Clear floats',
        description: 'Pushes selected block under floated content',
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
