import React from 'react';
import { render, act } from '@testing-library/react';
import Controller from '../../manage-toppings';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url === 'https://pizza-parlor.onrender.com/topping') {
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
