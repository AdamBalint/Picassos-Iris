import { FINAL_STYLIZE, SAVE_IMAGE, RESET_FINISH } from '../../app/actions/finish';
import Image from '../../app/models/Image';
import reducer, { INITIAL_STATE } from '../../app/reducers/reducer_finish';

test('Reducer returns initial state on default or invalid states', () => {
  expect(reducer(INITIAL_STATE, { type: null })).toEqual(INITIAL_STATE);
});

test('Reducer returns correct state back on FINAL_STYLIZE action', () => {
  let goodResponse = {
    type: FINAL_STYLIZE,
    payload: {
      data: {
        styled_base_64: 'some fake bs',
      },
    }
  };

  let badResponse = {
    type: FINAL_STYLIZE,
    payload: {
      data: {},
    },
  };

  expect(reducer(INITIAL_STATE, goodResponse)).toEqual({
    styledResult: new Image("some fake bs", 'png', 0, 0),
    saved: false,
    loading:false,
  });
  expect(reducer(INITIAL_STATE, badResponse)).toEqual(INITIAL_STATE);
});

test('Reducer returns correct state back on SAVE_IMAGE action', () => {
  let goodResponse = {
    type: SAVE_IMAGE,
    payload: {
      data: {
        status: 'ok',
      },
    }
  };

  let badResponse = {
    type: FINAL_STYLIZE,
    payload: {
      data: {},
    },
  };

  expect(reducer(INITIAL_STATE, goodResponse)).toEqual({
    styledResult: undefined,
    saved: true,
    loading: false,
  });

  expect(reducer(INITIAL_STATE, badResponse)).toEqual(INITIAL_STATE);
});
