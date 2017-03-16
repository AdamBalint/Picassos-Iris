import axios from 'axios';
import felix from 'felix';

// Cache is a key value store.
export const cache = felix.create('cache');

export const SELECT_STYLE = 'SELECT_STYLE';
export const STYLIZE_IMAGE = 'STYLIZE_IMAGE';

const API = '/stylize';

export function selectStyle(id) {
  return {
    type: SELECT_STYLE,
    payload: { id },
  };

}

export function stylize(styleId, targetImagePath, width, height) {
  // If it exists in the cache, just return the cached payload
  if (cache.get(styleId)) {
    return {
      type: STYLIZE_IMAGE,
      payload: { 
        data: {
          styled_base_64: cache.get(styleId),
        },
      },
    };
  }

  let response = axios.post(`${API}`, {
    file_path: targetImagePath,
    width: width,
    height: height,
  });

  return {
    type: STYLIZE_IMAGE,
    payload: response,
  };
}