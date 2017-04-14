import axios from 'axios';

export const FINAL_STYLIZE = 'FINAL_STYLIZE';
export const SAVE_IMAGE = 'SAVE_IMAGE';
export const RESET_FINISH = 'RESET_FINISH';

const STYLIZE_RESULT_API = '/stylize-result';
const SAVE_IMAGE_API = '/save-image';

export function resetFinish() {
  return {
    type: RESET_FINISH,
    payload: {},
  };
}

export function stylizeResult(styleId, targetImagePath, imageFile, opacity=1) {
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
