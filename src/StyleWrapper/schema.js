import config from '@plone/volto/registry';

export const StyleSchema = () => ({
  title: 'Styles',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['style_name'],
    },
    {
      id: 'standard',
      title: 'Standard',
      fields: ['textAlign', 'fontSize', 'align', 'size', 'isDropCap', 'hidden'],
    },
    {
      id: 'advanced',
      title: 'Advanced',
      fields: [
        'isScreenHeight',
        'backgroundImage',
        'backgroundColor',
        'textColor',
        'customClass',
        'customId',
      ],
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
      widget: 'object_by_path',
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
  },
  required: [],
});
