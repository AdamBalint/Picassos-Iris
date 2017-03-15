import { PICK_FILE } from '../actions/filepicker';
import Image from '../models/Image';

export const INITIAL_STATE = {
  isFileSelected: false,
  selectedFilePath: '',
  imageFile: undefined,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case PICK_FILE: {
      if (action.payload && action.payload.data) {
        let { status } = action.payload.data;
        if (status === 'ok') {
          let { file_path, img_base64, ext } = action.payload.data;
          return {
            isFileSelected: true,
            selectedFilePath: file_path,
            imageFile: new Image(img_base64, ext),
          };
        }
      }
      
      return state;
    }

    default: {
      return state;
    }
  }
}
