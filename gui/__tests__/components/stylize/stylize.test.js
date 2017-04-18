import React from 'react';
import { shallow } from 'enzyme';
import { Stylize }  from '../../../app/components/stylize/Stylize';
import Image from '../../../app/models/Image';

const fakeImageProp = new Image('fake_base64', '.png');
const stylize = shallow(
  <Stylize
  imageFile={fakeImageProp}
  styledPreview={fakeImageProp}
  currentPageIndex={1}
  setCurrentPageIndex={() => false}
  isBackButtonVisible={(fakeBool) => fakeBool}
  setBackLink={(fakeLink) => fakeLink}/>
);

beforeAll(() => {
  stylize.setProps({
    imageFile: fakeImageProp,
    resetLoading: () => false,
  });
});

test('Stylize renders without errors', () => {
  expect(stylize.length).toEqual(1);
});

test('Stylize renders StylePreview with Image', () => {
  expect(stylize.find('StylePreview').props().image).toEqual(fakeImageProp);
});

test('Stylize renders StyleList', () => {
  expect(stylize.find('StyleList').length).toEqual(1);
});
