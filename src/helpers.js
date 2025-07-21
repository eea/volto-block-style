import {
  isInternalURL,
  flattenToAppURL,
  getFieldURL,
} from '@plone/volto/helpers';

export function getImageScaleParams(image, size) {
  if (!image) return;
  const imageScale = size || 'preview'; // listings use preview scale

  if (Array.isArray(image)) {
    const result = image.map((item) => getImageScaleParams(item, size));
    return result.length > 0 ? result[0] : undefined;
  }

  if (typeof image === 'string')
    return isInternalURL(image)
      ? { download: flattenToAppURL(`${image}/@@images/image/${imageScale}`) }
      : { download: image };

  let url = getFieldURL(image);
  const imageScales = image.image_scales;
  const imageField = image.image_field;
  const imageScalesArray = imageScales?.[imageField];
  const imageScalesObject = imageScalesArray?.[0];
  const imageScalesObjectBasePath = imageScalesObject?.base_path;
  const imageScalesObjectScales = imageScalesObject?.scales;
  url = imageScalesObjectBasePath || url;
  if (url && isInternalURL(url)) {
    if (imageScalesArray) {
      const scale = url?.endsWith?.('.gif')
        ? imageScalesObject
        : imageScalesObjectScales?.[imageScale] || imageScalesObject;

      const download = flattenToAppURL(`${url}/${scale?.download}`);
      const width = scale?.width;
      const height = scale?.height;

      return {
        download,
        width,
        height,
      };
    } else if (image?.image?.scales) {
      const imageImage = image.image;
      const imageImageScales = imageImage.scales;
      const scale = imageImageScales?.[imageScale] || imageImage;
      const download = flattenToAppURL(scale?.download);
      const width = scale?.width;
      const height = scale?.height;

      return {
        download,
        width,
        height,
      };
    } else {
      // fallback if we do not have scales
      return {
        download: flattenToAppURL(
          `${url}/@@images/${imageField || 'image'}/${imageScale}`,
        ),
      };
    }
  } else {
    return { download: url };
  }
}
