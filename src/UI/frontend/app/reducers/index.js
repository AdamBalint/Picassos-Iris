import { combineReducers } from 'redux';

import FilePickerReducer from './reducer_filepicker';
import StylizeReducer from './reducer_stylize';
import FinishReducer from './reducer_finish';

const rootReducer = combineReducers({
  filepicker: FilePickerReducer,
  stylize: StylizeReducer,
  finish: FinishReducer,
});

export default rootReducer;
