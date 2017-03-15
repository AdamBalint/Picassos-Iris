import Image from '../../app/models/Image';
import { SELECT_STYLE, STYLIZE_IMAGE } from '../../app/actions/stylize';
import reducer, { INITIAL_STATE } from '../../app/reducers/reducer_stylize';

test('Reducer returns initial state on default or invalid states', () => {
  expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  expect(reducer(INITIAL_STATE, {type: null})).toEqual(INITIAL_STATE);
});

test('Reducer returns correct state on SELECT_STYLE', () => {
  const request = reducer(INITIAL_STATE, {
    type: SELECT_STYLE,
    payload: {
      id: 1,
    },
  });

  const expectedResponse = {
    selectedStyle: 1,
    styledPreview: '',
  };

  expect(request).toEqual(expectedResponse);
});

test('Reducer returns correct state on STYLIZE_IMAGE', () => {
  const requestPayload = {
    data: {
      styled_base_64: 'fake_base_64',
    },
  };

  const request = reducer(INITIAL_STATE, {
    type: STYLIZE_IMAGE,
    payload: requestPayload,
  });

  const expectedResponse = {
    selectedStyle: -1,
    styledPreview: new Image(requestPayload.data.styled_base_64, 'png'),
  };

  expect(request).toEqual(expectedResponse);
});