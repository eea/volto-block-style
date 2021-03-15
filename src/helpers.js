import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import transform from 'css-to-react-native';

export const cssParser = (css) => {
  return new Promise((resolve, reject) => {
    postcss([autoprefixer])
      .process(css, {})
      .then((result) => {
        const cssArray = [];
        result.root.nodes.forEach((node) => {
          if (node.prop && node.value) {
            cssArray.push([node.prop, node.value]);
          }
        });
        resolve(transform(cssArray));
      })
      .catch((error) => {
        reject({});
      });
  });
};
