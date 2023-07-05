import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Controller from '../../manage-toppings';
import View from '../../manage-toppings/view';

test('deletes a topping from the toppings list', async () => {
  // Mock the fetch function to return a specific list of toppings
  const mockToppings = [
    { _id: '1', name: 'Topping 1' },
  ];
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockToppings),
    })
  );

  // Render the Controller component
  render(
    <Controller>
      <View />
    </Controller>
  );
    // Wait for the loading message to disappear
  await waitFor(() => {
    expect(screen.queryByText('Loading toppings...')).toBeNull();
  });

  // Wait for the toppings to be loaded
  await screen.findByText('Topping 1');

  // Find the delete button for the second topping
  const deleteButton = await screen.findByText('X');

  // Click the delete button
  fireEvent.click(deleteButton);

  // Wait for the fetch call to complete
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

  // Restore the original fetch function
  global.fetch.mockRestore();
});
