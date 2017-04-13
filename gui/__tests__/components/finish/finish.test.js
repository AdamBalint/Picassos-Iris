import React from 'react';
import { shallow } from 'enzyme';
import Image from '../../../app/models/Image';
import { Finish } from '../../../app/components/finish/Finish';

test('Finish renders without errors', () => {
  const finish = shallow(
    <Finish isBackButtonVisible={() => false}
    setCurrentPageIndex={() => 1}
    setBackLink={() => false}
    styledResult={new Image('fake', 'png', 100, 100)}/>
  );

  expect(finish.length).toEqual(1);
});
