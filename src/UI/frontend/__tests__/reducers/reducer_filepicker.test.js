import React from 'react';
import reducer, { INITIAL_STATE } from '../../app/reducers/reducer_filepicker';
import Image from '../../app/models/Image';
import { PICK_FILE } from '../../app/actions/filepicker';


test('Reducer returns initial state on default or invalid states', () => {
  expect(reducer(INITIAL_STATE, {type: null})).toEqual(INITIAL_STATE);
});

test('Reducer returns correct state back on PICK_FILE action', () => {
  let goodResponse = {
    type: PICK_FILE,
    payload: {
      data: {
        status: 'ok',
        img_base64: 'fake',
        file_path: 'some/fake/path',
        ext: '.fake'
      }
    }
  };

  let badResponse = {
    type: PICK_FILE,
    payload: {}
  };

  let { img_base64, ext, file_path } = goodResponse.payload.data;

  expect(reducer(INITIAL_STATE, goodResponse)).toEqual({
    isFileSelected: true,
    imageFile: new Image(img_base64, ext),
    selectedFilePath: file_path
  });

  // Just return initial state
  expect(reducer(INITIAL_STATE, badResponse)).toEqual({
    isFileSelected: false,
    imageFile: undefined,
    selectedFilePath: ''
  });
});
