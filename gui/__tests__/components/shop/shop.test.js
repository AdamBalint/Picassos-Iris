import React from 'react';
import { shallow } from 'enzyme';
import { Shop } from '../../../app/components/shop/Shop';

test('Shop renders without errors', () => {
  const fakeFunc = () => false;
  const shop = shallow(
    <Shop
      isBackButtonVisible={fakeFunc}
      currentPageIndex={0}
      setBackLink={fakeFunc}
      setCurrentPageIndex={fakeFunc}
    />
  );

  expect(shop.length).toEqual(1);
});
