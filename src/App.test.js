import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('GoalForge App', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockClear();
  });

  test('renders GoalForge title', () => {
    render(<App />);
    const titleElement = screen.getByText(/GoalForge/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders goal input form', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Read 20 pages daily/i);
    const addButton = screen.getByText(/Add Goal/i);
    expect(inputElement).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('shows empty state when no goals', () => {
    render(<App />);
    const emptyMessage = screen.getByText(/No goals yet/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  test('can add a new goal', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Read 20 pages daily/i);
    const addButton = screen.getByText(/Add Goal/i);
    
    fireEvent.change(input, { target: { value: 'Test goal' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Test goal')).toBeInTheDocument();
  });

  test('shows stats when goals exist', () => {
    // Mock localStorage to return existing goals
    localStorageMock.getItem.mockReturnValue(JSON.stringify([
      { id: 1, text: 'Test goal', completed: false, createdAt: new Date().toISOString() }
    ]));
    
    render(<App />);
    
    expect(screen.getByText('Total Goals')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  test('validates goal input', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Read 20 pages daily/i);
    const addButton = screen.getByText(/Add Goal/i);
    
    // Test empty input
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(addButton);
    expect(screen.getByText(/Please enter a goal/i)).toBeInTheDocument();
    
    // Test too short input
    fireEvent.change(input, { target: { value: 'Hi' } });
    fireEvent.click(addButton);
    expect(screen.getByText(/Goal must be at least 3 characters/i)).toBeInTheDocument();
  });
});
