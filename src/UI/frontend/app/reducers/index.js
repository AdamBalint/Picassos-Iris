import { combineReducers } from 'redux';

import FilePickerReducer from './reducer_filepicker';

const rootReducer = combineReducers({
  filepicker: FilePickerReducer
});

export default rootReducer;
