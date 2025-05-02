import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from '../auth/Login';
import { vi } from 'vitest';
import axios from 'axios';

// Mock hooks and external dependencies
vi.mock('react-redux', () => ({
  ...vi.importActual('react-redux'),
  useSelector: vi.fn(),
  useDispatch: () => vi.fn()
}));

// Mock axios
vi.mock('axios');

// Mock utils/constant
vi.mock('@/utils/constant', () => ({
  USER_API_END_POINT: 'http://localhost:3000/api/v1/user'
}));

// Mock auth slice
vi.mock('@/redux/authSlice', () => ({
  setLoading: vi.fn(),
  setUser: vi.fn()
}));

const mockStore = configureStore([]);
const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Login Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        loading: false,
        user: null
      }
    });

    useSelector.mockImplementation(callback => callback(store.getState()));
    vi.clearAllMocks();
  });

  test('renders login form correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('handles successful login', async () => {
    const mockUser = {
      _id: 'user123',
      email: 'test@example.com',
      role: 'student'
    };

    axios.post.mockResolvedValueOnce({
      data: {
        success: true,
        message: 'Login successful',
        user: mockUser
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/login'),
        {
          email: 'test@example.com',
          password: 'password123',
          role: expect.any(String)
        },
        { withCredentials: true }
      );
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('handles login failure', async () => {
    const errorMessage = 'Invalid credentials';
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          success: false,
          message: errorMessage
        }
      }
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' }
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('validates required fields', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/please fill all fields/i)).toBeInTheDocument();
    });
  });

  test('shows loading state during login attempt', async () => {
    store = mockStore({
      auth: {
        loading: true,
        user: null
      }
    });

    useSelector.mockImplementation(callback => callback(store.getState()));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/please wait/i)).toBeInTheDocument();
  });
});