import { combineReducers } from 'redux';

import FilePickerReducer from './reducer_filepicker';
import StylizeReducer from './reducer_stylize';
import FinishReducer from './reducer_finish';
import AppReducer from './reducer_app';

export const CLEAR_STATE = 'CLEAR STATE';

const appReducer = combineReducers({
  filepicker: FilePickerReducer,
  stylize: StylizeReducer,
  finish: FinishReducer,
  app: AppReducer,
});

const rootReducer = (state, action) => {
  if (action.type === CLEAR_STATE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
