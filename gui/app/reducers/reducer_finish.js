import { FINAL_STYLIZE, SAVE_IMAGE, RESET_FINISH } from '../actions/finish';
import Image from '../models/Image';

export const INITIAL_STATE = {
  styledResult: undefined,
  loading: true,
  saved: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FINAL_STYLIZE: {
      if (action.payload.data.styled_base_64) {
        return {
          styledResult: new Image(action.payload.data.styled_base_64, 'png', 0, 0),
          loading: false,
          saved: state.saved,
        };
      }

      return state;
    }

    case SAVE_IMAGE: {
      if (action.payload.data.status === 'ok') {
        return {
          styledResult: state.styledResult,
          loading: false,
          saved: true,
        };
      }

      return state;
    }

    case RESET_FINISH: {
      return INITIAL_STATE;
    }

    default: {
      return state;
    }
  }
}