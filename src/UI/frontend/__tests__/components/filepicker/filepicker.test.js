import React from 'react';
import { shallow, mount } from 'enzyme';
import { Filepicker } from '../../../app/components/filepicker/Filepicker';
import Image from '../../../app/models/Image';

let WITH_IMAGE_SELECTOR = '.filepicker--with-image';
let TEXT_SELECTOR = '.filepicker__text';
let ICON_SELECTOR = '.filepicker__camera-img';
let HIDDEN_SELECTOR = '.filepicker__hidden-text-icon';

test('Filepicker renders without errors', () => {
  const filepicker = shallow(
    <Filepicker/>
  );

  expect(filepicker.length).toEqual(1);
});

test('Filepicker sets background if file is picked', () => {
  // Initially with no image
  const fakeImageProp = new Image('fakeUri', 'fakeExt');
  const filepicker = mount(
    <Filepicker isFileSelected={false}/>
  );

  expect(filepicker.find(WITH_IMAGE_SELECTOR).length).toEqual(0);

  // Set image
  filepicker.setProps({ isFileSelected: true, imageFile: fakeImageProp });

  expect(filepicker.find(WITH_IMAGE_SELECTOR).length).toEqual(1);
});

test('Filepicker text and icon hide if file is picked', () => {
  // Initially with no image
  const fakeImageProp = new Image('fakeUri', 'fakeExt');
  const filepicker = mount(
    <Filepicker isFileSelected={false}/>
  );

  expect(filepicker.find(TEXT_SELECTOR).length).toEqual(1);
  expect(filepicker.find(ICON_SELECTOR).length).toEqual(1);

  // Set image
  filepicker.setProps({ isFileSelected: true, imageFile: fakeImageProp });

  // Both text and icon classes shouldn't be there, but there should be 2 hidden classes.
  expect(filepicker.find(TEXT_SELECTOR).length).toEqual(0);
  expect(filepicker.find(ICON_SELECTOR).length).toEqual(0);
  expect(filepicker.find(HIDDEN_SELECTOR).length).toEqual(2);
});
