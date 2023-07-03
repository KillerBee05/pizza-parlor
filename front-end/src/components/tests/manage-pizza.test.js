import React from 'react';
import { render, act } from '@testing-library/react';
import Controller from '../manage-pizzas';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url === 'http://localhost:5000/pizza') {
      return Promise.resolve({
        json: () =>
          Promise.resolve([
            { _id: '1', name: 'Pizza 1', toppings: ['Topping 1', 'Topping 2'] },
            { _id: '2', name: 'Pizza 2', toppings: ['Topping 3', 'Topping 4'] },
          ]),
      });
    } else if (url === 'http://localhost:5000/topping') {
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





