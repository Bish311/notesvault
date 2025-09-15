import React from 'react';
import { render, screen } from '@testing-library/react';
import NoteCard from '../components/NoteCard';
import { BrowserRouter } from 'react-router-dom';

// Mock data
const testNote = {
  id: 'test123',
  title: 'Test Note',
  tags: ['important', 'test'],
  createdAt: '2025-09-15T10:00:00Z'
};

// Mock function
const mockDeleteFn = jest.fn();

// Test suite for NoteCard component
describe('NoteCard Component', () => {
  // Test case: renders note title correctly
  test('renders note title correctly', () => {
    render(
      <BrowserRouter>
        <NoteCard note={testNote} onDelete={mockDeleteFn} />
      </BrowserRouter>
    );
    
    const titleElement = screen.getByText('Test Note');
    expect(titleElement).toBeInTheDocument();
  });
  
  // Test case: renders all tags
  test('renders all tags', () => {
    render(
      <BrowserRouter>
        <NoteCard note={testNote} onDelete={mockDeleteFn} />
      </BrowserRouter>
    );
    
    const importantTag = screen.getByText('important');
    const testTag = screen.getByText('test');
    
    expect(importantTag).toBeInTheDocument();
    expect(testTag).toBeInTheDocument();
  });
  
  // Test case: renders formatted date
  test('renders formatted date', () => {
    render(
      <BrowserRouter>
        <NoteCard note={testNote} onDelete={mockDeleteFn} />
      </BrowserRouter>
    );
    
    // The exact format depends on the locale, so we just check if date exists
    const dateText = screen.getByText(/Sep 15, 2025/i);
    expect(dateText).toBeInTheDocument();
  });
  
  // Test case: renders edit link with correct href
  test('renders edit link with correct href', () => {
    render(
      <BrowserRouter>
        <NoteCard note={testNote} onDelete={mockDeleteFn} />
      </BrowserRouter>
    );
    
    const editLink = screen.getByText('Edit');
    expect(editLink.getAttribute('href')).toBe('/edit/test123');
  });
  
  // Test case: delete button calls onDelete function with correct ID
  test('delete button calls onDelete function with correct ID', () => {
    render(
      <BrowserRouter>
        <NoteCard note={testNote} onDelete={mockDeleteFn} />
      </BrowserRouter>
    );
    
    const deleteButton = screen.getByText('Delete');
    deleteButton.click();
    
    expect(mockDeleteFn).toHaveBeenCalledWith('test123');
  });
});
