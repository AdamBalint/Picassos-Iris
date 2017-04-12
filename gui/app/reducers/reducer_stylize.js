import { cache, SELECT_STYLE, STYLIZE_IMAGE, RESET_STYLIZE } from '../actions/stylize';
import Image from '../models/Image';

export const INITIAL_STATE = {
  selectedStyle: -1,
  styledPreview: '',
  quotes: [],
  loading: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_STYLE: {
      return {
        selectedStyle: action.payload.id,
        styledPreview: state.styledPreview,
        quotes: action.payload.quotes,
        loading: true,
      };
    }

    case STYLIZE_IMAGE: {
      // Cache the base64 string for the associated style
      cache.put(state.selectedStyle, action.payload.data.styled_base_64);

      return {
        selectedStyle: state.selectedStyle,
        styledPreview: new Image(action.payload.data.styled_base_64, 'png'),
        quotes: state.quotes,
        loading: false,
      };
    }

    case RESET_STYLIZE: {
      return INITIAL_STATE;
    }

    default: {
      return state;
    }
  }
}
