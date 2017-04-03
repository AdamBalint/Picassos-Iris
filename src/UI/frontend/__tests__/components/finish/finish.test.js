import React from 'react';
import { shallow } from 'enzyme';
import { Finish } from '../../../app/components/finish/Finish';

test('Finish renders without errors', () => {
  const finish = shallow(
    <Finish styledResult={{
      getCSSImageUrl: () => {
        return 'fakeCSSImageUrl';
      },
    }}/>
  );

  expect(finish.length).toEqual(1);
});
