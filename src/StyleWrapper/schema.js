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
      fields: ['textAlign', 'align', 'size'],
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
    textAlign: {
      title: 'Text align',
      widget: 'style_text_align',
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
