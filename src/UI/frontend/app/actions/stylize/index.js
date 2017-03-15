import axios from 'axios';

export const SELECT_STYLE = 'SELECT_STYLE';
export const STYLIZE_IMAGE = 'STYLIZE_IMAGE';

const API = '/stylize';

export function selectStyle(id) {
  return {
    type: SELECT_STYLE,
    payload: { id },
  };

}

export function stylize(target_image_path, width, height) {
  let response = axios.post(`${API}`, {
    file_path: target_image_path,
    width: width,
    height: height,
  });

  return {
    type: STYLIZE_IMAGE,
    payload: response,
  };
}
