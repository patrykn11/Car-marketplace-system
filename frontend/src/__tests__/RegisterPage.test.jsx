import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import { useAuth } from '../contexts/AuthContext';


vi.mock('../contexts/AuthContext', () => ({
    useAuth: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('RegisterPage Component', () => {
    const mockRegister = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        useAuth.mockReturnValue({
            register: mockRegister,
        });
    });

    it('renders all registration fields', () => {
        render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Location/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument();
    });

    it('updates input fields correctly', () => {
        render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );

        const usernameInput = screen.getByPlaceholderText(/Username/i);
        fireEvent.change(usernameInput, { target: { value: 'newUser' } });
        expect(usernameInput.value).toBe('newUser');
    });

    it('shows error if fields are empty on submit', async () => {
        render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );

        const submitButton = screen.getByRole('button', { name: /Register/i });
        fireEvent.click(submitButton);

        expect(await screen.findByText(/Please fill in all fields/i)).toBeInTheDocument();
    });

    it('calls register function on valid form submission', async () => {
        render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'user' } });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'pass' } });
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/\+48/i), { target: { value: '123' } });
        fireEvent.change(screen.getByPlaceholderText(/Location/i), { target: { value: 'Warsaw' } });

        const submitButton = screen.getByRole('button', { name: /Register/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockRegister).toHaveBeenCalledWith('user', 'pass', 'test@example.com', '123', 'Warsaw');
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });
});
