import React from 'react';
import renderer from 'react-test-renderer';

import App from '../App';

describe('[Component] Separator', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
