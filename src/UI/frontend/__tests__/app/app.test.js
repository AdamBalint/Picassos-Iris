import React from 'react';
import { shallow } from 'enzyme';
import App from '../../app/components/App';
import { Home } from '../../app/components/home/Home';

test('App renders without errors with other components', () => {
  const app = shallow(
    <App children={Home}/>
  );

  expect(app.length).toEqual(1);
});

test ('App has Nav component', () => {
  expect(shallow(<App/>).find('Nav').length).toEqual(1);
});
