import React from 'react';
import NameContainer from './Name.Container';

describe('login Comp', () => {
  test('verify name', () => {
    const wrapper = shallow(<NameContainer />);
    const name = 'Gaurav';
    // console.log('props',wrapper.props());
    // console.log('children',wrapper.props().children[0].props);
    // expect(wrapper.props().children).toBe(name);
    expect(wrapper.props().children).toHaveLength(2);
  });
});
