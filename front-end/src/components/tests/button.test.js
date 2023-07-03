import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from '../button';

test('renders the button with label', () => {
  const label = 'Click Me';
  render(<Button label={label} />);
  const buttonElement = screen.getByText(label);
  expect(buttonElement).toBeInTheDocument();
});

test('calls the onClick function when clicked', () => {
  const label = 'Click Me';
  const handleClick = jest.fn();
  render(<Button label={label} onClick={handleClick} />);
  const buttonElement = screen.getByText(label);
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
