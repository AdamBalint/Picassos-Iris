import axios from 'axios';
import felix from 'felix';

export const FINAL_STYLIZE = 'FINAL_STYLIZE';
export const SAVE_IMAGE = 'SAVE_IMAGE';
export const RESET_LOADING = 'RESET_LOADING';

const STYLIZE_RESULT_API = '/stylize-result';
const SAVE_IMAGE_API = '/save-image';

export const cache = felix.create('finish-cache');

export function clearCache() {
  if (cache) {
    cache.clear();
  }
}

export function resetLoading() {
  return {
    type: RESET_LOADING,
  };
}

export function stylizeResult(styleId, targetImagePath, imageFile, opacity = 1) {
  console.log(cache);
  if (cache.get(styleId)) {
    return {
      type: FINAL_STYLIZE,
      payload: {
        data: {
          id: styleId,
          styled_base_64: cache.get(styleId),
        },
      },
    };
  }

  let response = axios.post(`${STYLIZE_RESULT_API}`, {
    style_id: styleId,
    file_path: targetImagePath,
    width: imageFile.width,
    height: imageFile.height,
    opacity: opacity,
  });

  return {
    type: FINAL_STYLIZE,
    payload: response,
  };
}

export function saveImage(styledResult) {
  let response = axios.post(`${SAVE_IMAGE_API}`, {
    img_base64: styledResult.img_base64,
  });

  return {
    type: SAVE_IMAGE,
    payload: response,
  };
}
