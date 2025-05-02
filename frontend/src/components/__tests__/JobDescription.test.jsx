import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import JobDescription from '../JobDescription';
import { vi } from 'vitest';

// Mock the hooks before importing the component
vi.mock('react-redux', () => ({
  ...vi.importActual('react-redux'),
  useSelector: vi.fn(),
  useDispatch: () => vi.fn()
}));

const mockStore = configureStore([]);

describe('JobDescription Component', () => {
  let store;

  beforeEach(() => {
    // Set up mock store data
    const mockJob = {
      _id: 'test-job-id',
      title: 'Senior Developer',
      description: 'Senior developer position',
      requirements: 'Must have 5+ years experience',
      salary: '120000',
      location: 'San Francisco',
      jobType: 'Full-time',
      experience: '5',
      position: 2,
      applications: [],
      company: {
        name: 'Tech Company',
        logo: 'company-logo.png'
      }
    };

    store = mockStore({
      job: {
        singleJob: mockJob
      },
      auth: {
        user: {
          _id: 'test-user-id',
          token: 'test-token'
        }
      }
    });

    // Mock useSelector implementation
    useSelector.mockImplementation(callback => {
      return callback(store.getState());
    });

    vi.clearAllMocks();
  });

  test('renders job details correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <JobDescription />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Senior Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/San Francisco/i)).toBeInTheDocument();
    expect(screen.getByText(/Full-time/i)).toBeInTheDocument();
    expect(screen.getByText(/₹120000/i)).toBeInTheDocument();
  });

  test('handles application submission', async () => {
    const mockPostResponse = {
      data: { success: true, message: 'Application submitted successfully' }
    };
    vi.spyOn(axios, 'post').mockResolvedValueOnce(mockPostResponse);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <JobDescription />
        </BrowserRouter>
      </Provider>
    );

    const applyButton = screen.getByRole('button', { name: /apply now/i });
    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
  });

  test('shows submitted state for already applied jobs', () => {
    const storeWithAppliedJob = mockStore({
      ...store.getState(),
      job: {
        singleJob: {
          ...store.getState().job.singleJob,
          applications: [{ applicant: 'test-user-id' }]
        }
      }
    });

    // Update useSelector mock for this test
    useSelector.mockImplementation(callback => {
      return callback(storeWithAppliedJob.getState());
    });

    render(
      <Provider store={storeWithAppliedJob}>
        <BrowserRouter>
          <JobDescription />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Application Submitted/i)).toBeInTheDocument();
  });
});