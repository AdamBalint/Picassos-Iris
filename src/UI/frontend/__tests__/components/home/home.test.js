import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../../app/components/home/Home';

test('Home renders without errors', () => {
  const home = shallow(
    <Home/>
  );

  expect(home.length).toEqual(1);
});

test('Continue button only shows when image is selected', () => {
  const homeWithFileSelected = shallow(
    <Home isFileSelected={true}/>
  );

  const homeWithoutFileSelected = shallow(
    <Home/>
  )

  expect(homeWithFileSelected.find('.btn--continue').length).toBe(1);
  expect(homeWithoutFileSelected.find('.btn--continue').length).toBe(0);
});
