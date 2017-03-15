import { combineReducers } from 'redux';

import FilePickerReducer from './reducer_filepicker';
import StylizeReducer from './reducer_stylize';

const rootReducer = combineReducers({
  filepicker: FilePickerReducer,
  stylize: StylizeReducer,
});

export default rootReducer;
