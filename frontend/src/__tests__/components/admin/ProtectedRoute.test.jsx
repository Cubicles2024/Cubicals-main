import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../../../components/admin/ProtectedRoute';
import Login from '@/components/auth/Login';
import { useSelector } from 'react-redux';

// Mock react-redux hooks
vi.mock('react-redux', () => ({
  ...vi.importActual('react-redux'),
  useSelector: vi.fn(),
}));

describe('ProtectedRoute', () => {
  it('redirects to login when unauthenticated', async () => {
    // Mock useSelector to return unauthenticated state
    useSelector.mockImplementation(callback => callback({
      auth: {
        user: null,
        loading: false,
        error: null
      }
    }));

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={
            <ProtectedRoute>
              <div>Protected Content</div>
            </ProtectedRoute>
          }/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      </MemoryRouter>
    );

    // Verify login form renders
    expect(await screen.findByRole('form', { 
      name: /login form/i 
    })).toBeInTheDocument();
  });
}); 