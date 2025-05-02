import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import PostJob from '../admin/PostJob';
import { vi } from 'vitest';
import axios from 'axios';

// Mock the hooks
vi.mock('react-redux', () => ({
  ...vi.importActual('react-redux'),
  useSelector: vi.fn(),
  useDispatch: () => vi.fn()
}));

// Mock axios
vi.mock('axios');

const mockStore = configureStore([]);

describe('PostJob Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      company: {
        companies: [
          {
            _id: 'company1',
            name: 'Tech Corp',
            logo: 'tech-corp-logo.png'
          },
          {
            _id: 'company2',
            name: 'Dev Inc',
            logo: 'dev-inc-logo.png'
          }
        ]
      },
      auth: {
        loading: false
      }
    });

    // Mock useSelector implementation
    useSelector.mockImplementation(callback => {
      return callback(store.getState());
    });

    vi.clearAllMocks();
  });

  test('renders form fields correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PostJob />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/requirements/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/salary/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/job type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/experience/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/position/i)).toBeInTheDocument();
  });

  test('handles form submission correctly', async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        success: true,
        message: 'Job posted successfully'
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PostJob />
        </BrowserRouter>
      </Provider>
    );

    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { name: 'title', value: 'Senior Developer' }
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { name: 'description', value: 'Senior developer position' }
    });
    fireEvent.change(screen.getByLabelText(/requirements/i), {
      target: { name: 'requirements', value: '5+ years experience' }
    });
    fireEvent.change(screen.getByLabelText(/salary/i), {
      target: { name: 'salary', value: '120000' }
    });
    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { name: 'location', value: 'Remote' }
    });
    fireEvent.change(screen.getByLabelText(/job type/i), {
      target: { name: 'jobType', value: 'Full-time' }
    });
    fireEvent.change(screen.getByLabelText(/experience/i), {
      target: { name: 'experience', value: '5' }
    });
    fireEvent.change(screen.getByLabelText(/position/i), {
      target: { name: 'position', value: '2' }
    });

    // Submit form
    fireEvent.click(screen.getByText('Post New Job'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/post'),
        expect.objectContaining({
          title: 'Senior Developer',
          description: 'Senior developer position',
          requirements: '5+ years experience',
          salary: '120000',
          location: 'Remote',
          jobType: 'Full-time',
          experience: '5',
          position: '2'
        }),
        expect.any(Object)
      );
    });
  });

  test('displays validation error for missing required fields', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PostJob />
        </BrowserRouter>
      </Provider>
    );

    // Submit form without filling required fields
    fireEvent.click(screen.getByText('Post New Job'));

    expect(screen.getByText(/please fill all required fields/i)).toBeInTheDocument();
  });

  test('shows loading state during form submission', async () => {
    axios.post.mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 1000)));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PostJob />
        </BrowserRouter>
      </Provider>
    );

    // Fill in a required field
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { name: 'title', value: 'Test Job' }
    });

    // Submit form
    fireEvent.click(screen.getByText('Post New Job'));

    expect(screen.getByText(/please wait/i)).toBeInTheDocument();
  });
});