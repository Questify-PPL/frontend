import React from 'react';
import { render, screen } from '@testing-library/react';
import InfoTable from '@/components/shop/InfoTable';
import "@testing-library/jest-dom";

describe('InfoTable', () => {
  test('renders item and date labels', () => {
    render(<InfoTable />);

    // Assert that the "Item" label is rendered
    const itemLabel = screen.getByText(/Item/i);
    expect(itemLabel).toBeInTheDocument();

    // Assert that the "Date" label is rendered
    const dateLabel = screen.getByText(/Date/i);
    expect(dateLabel).toBeInTheDocument();
  })});
