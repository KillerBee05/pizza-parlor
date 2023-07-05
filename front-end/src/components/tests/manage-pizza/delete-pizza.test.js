import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Controller from '../../manage-pizzas';
import View from '../../manage-pizzas/view';

describe('Delete Pizza', () => {
  test('Successfully delete an existing pizza', async () => {
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
      })
      .mockResolvedValueOnce({
        json: () =>
          Promise.resolve([
            { _id: '2', name: 'Mozzarella' },
            { _id: '3', name: 'New Topping' },
          ]),
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
    const deleteButton = await screen.findByText('X');

    // Click the Delete button
    fireEvent.click(deleteButton);

    // Wait for the pizzas to be updated
    await waitFor(() => {
      expect(screen.queryByText('Margherita (Tomato, Cheese)')).not.toBeInTheDocument();
    });
  });
});
