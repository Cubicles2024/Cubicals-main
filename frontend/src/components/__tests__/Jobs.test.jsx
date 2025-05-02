import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Jobs from '../Jobs';
import { vi } from 'vitest';

// Mock the hooks
vi.mock('react-redux', () => ({
  ...vi.importActual('react-redux'),
  useSelector: vi.fn(),
  useDispatch: () => vi.fn()
}));

// Mock custom hooks
vi.mock('@/hooks/useGetAllJobs', () => ({
  default: vi.fn()
}));

const mockStore = configureStore([]);

describe('Jobs Component', () => {
  let store;

  beforeEach(() => {
    const mockJobs = [
      {
        _id: '1',
        title: 'Frontend Developer',
        description: 'React developer position',
        location: 'Remote',
        company: { name: 'Tech Corp' }
      },
      {
        _id: '2',
        title: 'Backend Developer',
        description: 'Node.js developer position',
        location: 'New York',
        company: { name: 'Dev Inc' }
      }
    ];

    store = mockStore({
      job: {
        allJobs: mockJobs,
        searchedQuery: ''
      }
    });

    // Mock useSelector implementation
    useSelector.mockImplementation(callback => {
      return callback(store.getState());
    });

    vi.clearAllMocks();
  });

  test('renders jobs list correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Jobs />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();
  });

  test('filters jobs based on search query', () => {
    store = mockStore({
      job: {
        allJobs: store.getState().job.allJobs,
        searchedQuery: 'Frontend'
      }
    });

    // Update useSelector mock for this test
    useSelector.mockImplementation(callback => {
      return callback(store.getState());
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Jobs />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.queryByText('Backend Developer')).not.toBeInTheDocument();
  });

  test('shows "No jobs found" when no jobs match filter', () => {
    store = mockStore({
      job: {
        allJobs: [],
        searchedQuery: 'NonexistentJob'
      }
    });

    // Update useSelector mock for this test
    useSelector.mockImplementation(callback => {
      return callback(store.getState());
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Jobs />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/no jobs found/i)).toBeInTheDocument();
  });
});