import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Switch from '../Switch';

describe('Switch', () => {
  it('renders switch with label', () => {
    render(<Switch label="Switch Me" />);
    expect(screen.getByText('Switch Me')).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Switch label="Switch" onChange={handleChange} />);

    fireEvent.click(screen.getByText('Switch'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('does not call onChange when disabled', async () => {
    const handleChange = vi.fn();
    render(<Switch label="Disabled" onChange={handleChange} disabled />);

    const switchElement = screen.getByRole('checkbox');
    fireEvent.click(switchElement);

    await userEvent.click(switchElement);

    expect(handleChange).not.toHaveBeenCalled();
  });
});
