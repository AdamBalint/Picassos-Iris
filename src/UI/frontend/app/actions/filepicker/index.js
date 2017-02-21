import axios from 'axios';

export const PICK_FILE = 'PICK_FILE';

const API = '/open/file';

export function pickFile() {
  const response = axios.get(`${API}`);
  return {
    type: PICK_FILE,
    payload: response
  };
}
