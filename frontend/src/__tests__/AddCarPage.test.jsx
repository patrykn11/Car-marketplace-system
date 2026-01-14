import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AddCarPage from '../pages/AddCarPage';
import { useAuth } from '../contexts/AuthContext';

vi.mock('../contexts/AuthContext');

// Mocks to keep component rendering
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Helper to wrap component in context
const renderComponent = () => {
    return render(
        <MemoryRouter>
            <AddCarPage />
        </MemoryRouter>
    );
};

describe('AddCarPage Component', () => {
    const mockAuthFetch = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        URL.createObjectURL = vi.fn(() => 'mock-url');
    });

    it('renders form fields when authenticated', () => {
        useAuth.mockReturnValue({
            isAuthenticated: true,
            token: 'mock-token',
            authFetch: mockAuthFetch
        });

        renderComponent();

        expect(screen.getByText(/Add New Advertisement/i)).toBeInTheDocument();
        expect(screen.getByText(/Basic Information/i)).toBeInTheDocument();
        // Just checking basic presence of key elements
        expect(screen.getByText(/Price \(PLN\)/i)).toBeInTheDocument();
    });
});
