import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PentagonChart } from './PentagonChart';

const mockData = [
  { label: 'A', value: 80 },
  { label: 'B', value: 90 },
  { label: 'C', value: 70 },
  { label: 'D', value: 85 },
  { label: 'E', value: 95 },
];

describe('PentagonChart', () => {
  it('renders without crashing', () => {
    render(<PentagonChart data={mockData} color="#3BA4FF" accentColor="#00E0FF" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders labels from data', () => {
    render(<PentagonChart data={mockData} color="#3BA4FF" accentColor="#00E0FF" />);
    mockData.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('renders values from data', () => {
    render(<PentagonChart data={mockData} color="#3BA4FF" accentColor="#00E0FF" />);
    mockData.forEach(({ value }) => {
      expect(screen.getByText(`${value}%`)).toBeInTheDocument();
    });
  });
});
