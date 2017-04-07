import axios from 'axios';

export const FINAL_STYLIZE = 'FINAL_STYLIZE';
export const SAVE_IMAGE = 'SAVE_IMAGE';
export const RESET_FINISH = 'RESET_FINISH';

const STYLIZE_RESULT_API = '/stylize';
const SAVE_IMAGE_API = '/save-image';

export function resetFinish() {
  return {
    type: RESET_FINISH,
    payload: {},
  };
}

export function stylizeResult(styleId, targetImagePath, width, height) {
  let response = axios.post(`${STYLIZE_RESULT_API}`, {
    file_path: targetImagePath,
    width: width,
    height: height,
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
