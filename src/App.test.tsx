import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Breckulator app', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Breckulator/i);
  expect(titleElement).toBeInTheDocument();
});
