import React from 'react';
import { isEmpty } from 'lodash';

export default function withCachedImages(WrappedComponent, config = {}) {
  return (props) => {
    const mounted = React.useRef(false);
    const [images, setImages] = React.useState({});
    const image = isEmpty(config.getImage?.(props))
      ? null
      : config.getImage(props);

    React.useEffect(() => {
      if (!mounted.current) mounted.current = true;
      if (image && !images[image]) {
        const newImage = new Image();
        newImage.src = `${image}/@@images/image`;
        setImages({ ...images, [image]: null });
        newImage.onload = () => {
          if (mounted.current) {
            setImages({ ...images, [image]: newImage });
          }
        };
      }
      return () => {
        mounted.current = false;
      };
      /* eslint-disable-next-line */
    }, [image]);

    return <WrappedComponent {...props} images={images} />;
  };
}
