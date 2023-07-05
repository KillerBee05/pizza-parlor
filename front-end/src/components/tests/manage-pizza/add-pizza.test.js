import React from 'react';
import { render, act, waitFor, fireEvent, screen } from '@testing-library/react';
import Controller from '../../manage-pizzas';
import fetchMock from "jest-fetch-mock";


beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url === 'https://pizza-parlor.onrender.com/pizza') {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            { _id: '1', name: 'Pizza 1', toppings: ['Topping 1', 'Topping 2'] },
            { _id: '2', name: 'Pizza 2', toppings: ['Topping 3', 'Topping 4'] },
          ]),
      });
    } else if (url === 'https://pizza-parlor.onrender.com/topping') {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            { _id: '1', name: 'Topping 1' },
            { _id: '2', name: 'Topping 2' },
            { _id: '3', name: 'Topping 3' },
            { _id: '4', name: 'Topping 4' },
          ]),
      });
    }
  });
});

afterEach(() => {
  global.fetch.mockRestore();
});

test('renders all pizzas fetched from the API', async () => {
  let container;

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    const { container: renderedContainer } = render(<Controller />);
    container = renderedContainer;
  });

  expect(container.textContent).toContain('Pizza 1');
  expect(container.textContent).toContain('Pizza 2');
});

test('renders all toppings fetched from the API', async () => {
  let container;

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    const { container: renderedContainer } = render(<Controller />);
    container = renderedContainer;
  });

  expect(container.textContent).toContain('Topping 1');
  expect(container.textContent).toContain('Topping 2');
  expect(container.textContent).toContain('Topping 3');
  expect(container.textContent).toContain('Topping 4');
});

test('fetches pizzas when the component mounts', async () => {
  render(<Controller />);
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
  expect(global.fetch).toHaveBeenCalledWith('https://pizza-parlor.onrender.com/pizza');
  expect(global.fetch).toHaveBeenCalledWith('https://pizza-parlor.onrender.com/topping');
});

test('creates a new pizza when name and toppings are provided', async () => {
  render(<Controller />);
  const pizzaName = 'New Pizza';
  const toppings = ['Topping 1', 'Topping 2'];
  const createButton = screen.getByText('Add');
  
  fireEvent.change(screen.getByTestId('pizza-input'), { target: { value: pizzaName } });
  const toppingsSelect = screen.getByLabelText('select topping');
  toppings.forEach((topping) => {
    fireEvent.change(toppingsSelect, { target: { value: topping } });
    fireEvent.keyDown(toppingsSelect, { key: 'Enter' });
  });
  fireEvent.click(createButton);

  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(5));
  expect.objectContaining({
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: pizzaName, toppings: ['Topping 1', 'Topping 2'] }),
  });
});