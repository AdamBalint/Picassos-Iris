import axios from 'axios';

export const SELECT_STYLE = 'SELECT_STYLE';
export const STYLIZE_IMAGE = 'STYLIZE_IMAGE';
export const RESET_STYLIZE = 'RESET_STYLIZE';
export const FINAL_STYLIZE = 'FINAL_STYLIZE';

const API = '/stylize-preview';

export function selectStyle(id, quotes) {
  return {
    type: SELECT_STYLE,
    payload: { id, quotes },
  };
}

export function resetStylize() {
  return {
    type: RESET_STYLIZE,
  };
}

export function stylize(styleId, targetImagePath, width, height) {
  let response = axios.post(`${API}`, {
    style_id: styleId,
    file_path: targetImagePath,
    width: width,
    height: height,
  });

  return {
    type: STYLIZE_IMAGE,
    payload: response,
  };
}
