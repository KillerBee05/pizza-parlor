import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Controller from '../../manage-toppings';
import View from '../../manage-toppings/view';

test('successfully adds a new topping and verifies it in the toppings list', async () => {
    // Mock the fetch requests and response data
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ json: () => Promise.resolve([]) }) // Initial toppings fetch
      .mockResolvedValueOnce({ json: () => Promise.resolve({}) }) // Topping creation
  
    render(
      <Controller>
        <View />
      </Controller>
    );
  
    // Wait for the toppings to be loaded
    await waitFor(() => {
      expect(screen.getByText(/Loading toppings/i)).toBeInTheDocument();
    });
  
    // Assert that the Add Topping button is present
    const addButton = await screen.findByText('Add');
    expect(addButton).toBeInTheDocument();
  
    // Get the input field for the topping name
    const inputField = screen.getByLabelText('add topping');
    expect(inputField).toBeInTheDocument();
  
    // Enter the new topping name
    fireEvent.change(inputField, { target: { value: 'New Topping' } });
  
    // Submit the form
    fireEvent.click(addButton);
  
    // Wait for the topping to be added and rendered in the toppings list
    await waitFor(() => {
        expect(inputField.value).toBe('New Topping');
      });
    

  // Verify that the fetch function was called with the correct data
  expect(global.fetch).toHaveBeenCalledTimes(3);
  expect(global.fetch).toHaveBeenCalledWith('https://pizza-parlor.onrender.com/topping', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topping: 'New Topping' }),
  });
  });
  