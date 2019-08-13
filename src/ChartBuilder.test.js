import React from 'react';
import ReactDOM from 'react-dom';
import ChartBuilder from './ChartBuilder';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChartBuilder />, div);
  ReactDOM.unmountComponentAtNode(div);
});
