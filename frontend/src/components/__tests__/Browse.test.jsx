import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Browse from '../Browse';
import { vi } from 'vitest';

// Mock the hooks
vi.mock('react-redux', () => ({
  ...vi.importActual('react-redux'),
  useSelector: vi.fn(),
  useDispatch: () => vi.fn()
}));

// Mock useGetAllJobs hook
vi.mock('@/hooks/useGetAllJobs', () => ({
  default: vi.fn()
}));

const mockStore = configureStore([]);

describe('Browse Component', () => {
  let store;

  beforeEach(() => {
    const mockJobs = [
      {
        _id: '1',
        title: 'Frontend Developer',
        location: 'Remote',
        jobType: 'Full-time',
        experience: '2',
        company: { name: 'Tech Corp' }
      },
      {
        _id: '2',
        title: 'Backend Developer',
        location: 'New York',
        jobType: 'Contract',
        experience: '5',
        company: { name: 'Dev Inc' }
      }
    ];

    store = mockStore({
      job: {
        allJobs: mockJobs,
        searchedQuery: '',
        locationFilter: '',
        jobTypeFilter: '',
        experienceFilter: ''
      }
    });

    // Mock useSelector implementation
    useSelector.mockImplementation(callback => {
      return callback(store.getState());
    });

    vi.clearAllMocks();
  });

  test('renders filter options correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Browse />
        </BrowserRouter>
      </Provider>
    );

    // Check for filter option labels
    expect(screen.getByText(/Location/i)).toBeInTheDocument();
    expect(screen.getByText(/Job Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Experience/i)).toBeInTheDocument();
  });

  test('filters jobs by location', () => {
    store = mockStore({
      job: {
        ...store.getState().job,
        locationFilter: 'Remote'
      }
    });

    useSelector.mockImplementation(callback => callback(store.getState()));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Browse />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.queryByText('Backend Developer')).not.toBeInTheDocument();
  });

  test('filters jobs by job type', () => {
    store = mockStore({
      job: {
        ...store.getState().job,
        jobTypeFilter: 'Contract'
      }
    });

    useSelector.mockImplementation(callback => callback(store.getState()));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Browse />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText('Frontend Developer')).not.toBeInTheDocument();
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();
  });

  test('filters jobs by experience level', () => {
    store = mockStore({
      job: {
        ...store.getState().job,
        experienceFilter: '5'
      }
    });

    useSelector.mockImplementation(callback => callback(store.getState()));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Browse />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.queryByText('Frontend Developer')).not.toBeInTheDocument();
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();
  });

  test('combines multiple filters', () => {
    store = mockStore({
      job: {
        ...store.getState().job,
        locationFilter: 'Remote',
        jobTypeFilter: 'Full-time'
      }
    });

    useSelector.mockImplementation(callback => callback(store.getState()));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Browse />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.queryByText('Backend Developer')).not.toBeInTheDocument();
  });

  test('resets filters', () => {
    const allJobsState = store.getState().job.allJobs;
    store = mockStore({
      job: {
        ...store.getState().job,
        locationFilter: '',
        jobTypeFilter: '',
        experienceFilter: '',
        allJobs: allJobsState
      }
    });

    useSelector.mockImplementation(callback => callback(store.getState()));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Browse />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();
  });

  test('shows no results message when no jobs match filters', () => {
    store = mockStore({
      job: {
        ...store.getState().job,
        allJobs: []
      }
    });

    useSelector.mockImplementation(callback => callback(store.getState()));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Browse />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/no jobs found/i)).toBeInTheDocument();
  });
});