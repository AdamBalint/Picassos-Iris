import { SELECT_STYLE, STYLIZE_IMAGE } from '../actions/stylize';
import Image from '../models/Image';

export const INITIAL_STATE = {
  selectedStyle: -1,
  styledPreview: '',
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_STYLE: {
      return {
        selectedStyle: action.payload.id,
        styledPreview: state.styledPreview,
      };
    }

    case STYLIZE_IMAGE: {
      return {
        selectedStyle: state.selectedStyle,
        styledPreview: new Image(action.payload.data.styled_base_64, 'png'),
      };
    }

    default: {
      return state;
    }
  }
}
