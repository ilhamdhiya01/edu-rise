import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import Input from '../Input';

test('must render placeholder and detect input change', async () => {
  // Mock onChange function
  const handleChange = vi.fn();

  // 1. Render component to virtual DOM
  render(
    <Input placeholder="Masukkan nama..." value="" onChange={handleChange} />
  );

  // 2. Get elemen input by placeholder
  const inputEl = screen.getByPlaceholderText('Masukkan nama...');
  expect(inputEl).toBeInTheDocument();

  // 3. Simulate user typing something into the input
  await userEvent.type(inputEl, 'Budi');

  // 4. Make sure onChange function is called when there is a change
  expect(handleChange).toHaveBeenCalled();
});

test('must display value that is passed via props', () => {
  render(<Input value="John Doe" onChange={() => {}} />);

  const inputEl = screen.getByDisplayValue('John Doe');

  // Make sure value in input is same with props
  expect(inputEl).toHaveValue('John Doe');
});
