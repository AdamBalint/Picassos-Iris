import axios from 'axios';
export const FINAL_STYLIZE = 'FINAL_STYLIZE';
export const SAVE_IMAGE = 'SAVE_IMAGE';

const API = '/stylize';

export function stylizeResult(styleId, targetImagePath, width, height) {
  let response = axios.post(`${API}`, {
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
  let response = axios.post(`${API}`, {
    img_base64: styledResult.img_base64,
  });

  return {
    type: SAVE_IMAGE,
    payload: response,
  }
}
