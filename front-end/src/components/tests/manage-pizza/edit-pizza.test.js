import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Controller from '../../manage-pizzas';
import View from '../../manage-pizzas/view';

describe('Edit Pizza', () => {
    test('Successfully update an existing pizza', async () => {
  // Mock the fetch requests and response data
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      json: () =>
        Promise.resolve([
          {
            _id: '1',
            name: 'Margherita',
            toppings: ['Tomato', 'Cheese'],
          },
        ]),
    })
    .mockResolvedValueOnce({
      json: () =>
        Promise.resolve([
          { _id: '1', name: 'Tomato' },
          { _id: '2', name: 'Mozzarella' },
          { _id: '3', name: 'New Topping' },
        ]),
    })
    .mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          _id: '1',
          name: 'Updated Pizza',
          toppings: ['Tomato', 'Mozzarella', 'New Topping'],
        }),
    });

  // Render the Controller component
  render(
    <Controller>
      <View />
    </Controller>
  );

  // Wait for the pizzas and toppings to be loaded
  await waitFor(() => {
    expect(screen.getByText(/Loading pizza and toppings/i)).toBeInTheDocument();
  });

  // Assert that the Edit button is present
  const editButton = await screen.findByText('Edit');

  // Click the Edit button
  fireEvent.click(editButton);

  // Enter the updated pizza name
  const pizzaNameInput = screen.getByPlaceholderText('Pizza name');
  fireEvent.change(pizzaNameInput, { target: { value: 'Updated Pizza' } });

  // Select the updated toppings
  const toppingsSelect = screen.getByLabelText('edit topping');
  fireEvent.change(toppingsSelect, {
    target: { value: ['Tomato', 'Mozzarella', 'New Topping'] },
  });

  // Click the Save button
  const saveButton = screen.getByText('Save', { selector: 'button' });
  fireEvent.click(saveButton);

  // Wait for the pizza to be updated using the custom text matcher
  const pizzaElement = await screen.findByTestId('pizza-0');
  expect(pizzaElement).toBeInTheDocument();

  // Assert that the updated pizza is displayed
  expect(screen.getByLabelText('edit pizza', { value: 'Updated Pizza' })).toBeInTheDocument();
  expect(screen.getByTestId('pizza-0')).toBeInTheDocument(); // Assuming the first pizza has an index of 0
      
  });
});