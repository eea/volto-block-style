export const StyleSchema = () => ({
  title: 'Styles',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['style_name', 'align', 'size'],
    },
    {
      id: 'advanced',
      title: 'Advanced',
      fields: ['backgroundColor', 'textColor'],
    },
  ],
  properties: {
    style_name: {
      title: 'Style',
      widget: 'style_select',
    },
    align: {
      title: 'Align',
      widget: 'style_align',
    },
    size: {
      title: 'Size',
      widget: 'style_size',
    },
    backgroundColor: {
      title: 'Background color',
      type: 'color',
      widget: 'style_simple_color',
    },
    textColor: {
      title: 'Text color',
      type: 'color',
      widget: 'style_simple_color',
    },
  },
  required: [],
});
