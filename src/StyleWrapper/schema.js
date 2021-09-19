import config from '@plone/volto/registry';

export const StyleSchema = () => ({
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
      fields: ['textAlign', 'fontSize', 'align', 'size', 'isDropCap'],
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
      fields: ['margin', 'padding', 'size', 'align'], // todo: width, conflicts with size
    },
    {
      id: 'advanced',
      title: 'Advanced',
      fields: ['hidden', 'isScreenHeight', 'customClass', 'customId'],
    },
  ],
  properties: {
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
      description: 'A custom CSS class, aplicable just to this block',
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
  },
  required: [],
});
