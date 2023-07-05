import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Controller from '../../manage-toppings';
import View from '../../manage-toppings/view';

describe('Edit Topping', () => {
    test('Successfully update an existing topping', async () => {
      // Mock the fetch requests and response data
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve([
              { _id: '1', name: 'Topping 1' }
            ]),
        })
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve([
              { _id: '1', name: 'Updated Topping' }
            ]),
        });
  
      // Render the Controller component
      render(
        <Controller>
          <View />
        </Controller>
      );
  
      // Wait for the toppings to be loaded
      await waitFor(() => {
        expect(screen.getByText(/Loading toppings/i)).toBeInTheDocument();
      });
  
      // Assert that the Edit button is present
      const editButton = await screen.findByText('Edit');
  
      // Click the Edit button
      fireEvent.click(editButton);
  
      // Enter the updated topping name
      const toppingNameInput = screen.getByPlaceholderText('Topping name');
      fireEvent.change(toppingNameInput, {
        target: { value: 'Updated Topping' },
      });
  
      // Click the Save button
      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
  
      // Wait for the topping to be updated using the custom text matcher
      const updatedToppingElement = await screen.findByTestId('topping-0');
      expect(updatedToppingElement).toBeInTheDocument();
    });
  });
  
  