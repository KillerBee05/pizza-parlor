import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../header';

test('renders the header text', () => {
  render(<Header />);
  const headerElement = screen.getByText(/Pizza Parlor/i);
  expect(headerElement).toBeInTheDocument();
});
