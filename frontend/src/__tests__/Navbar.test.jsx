import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

vi.mock('../contexts/AuthContext');
vi.mock('../contexts/ThemeContext');

describe('Navbar Component', () => {
    const mockLogout = vi.fn();
    const mockToggleTheme = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();

        useTheme.mockReturnValue({
            theme: 'light',
            toggleTheme: mockToggleTheme
        });
    });

    it('renders logo', () => {
        useAuth.mockReturnValue({ isAuthenticated: false });
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        expect(screen.getByText(/EITI MOTO/i)).toBeInTheDocument();
    });

    it('shows login/register links when unauthenticated', () => {
        useAuth.mockReturnValue({ isAuthenticated: false });
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Register/i })).toBeInTheDocument();
        expect(screen.queryByText(/My profile/i)).not.toBeInTheDocument();
    });

    it('shows profile/logout links when authenticated', () => {
        useAuth.mockReturnValue({
            isAuthenticated: true,
            logout: mockLogout
        });
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        expect(screen.queryByRole('link', { name: /Login/i })).not.toBeInTheDocument();
        expect(screen.getByRole('link', { name: /My profile/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Logout/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Add Car/i })).toBeInTheDocument();
    });

    it('calls logout function when logout button clicked', () => {
        useAuth.mockReturnValue({
            isAuthenticated: true,
            logout: mockLogout
        });
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /Logout/i }));
        expect(mockLogout).toHaveBeenCalled();
    });

    it('toggles theme when theme button clicked', () => {
        useAuth.mockReturnValue({ isAuthenticated: false });
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        const themeBtn = screen.getByRole('button', { name: /Toggle Theme/i });
        fireEvent.click(themeBtn);
        expect(mockToggleTheme).toHaveBeenCalled();
    });

    it('applies active class to current link', () => {
        useAuth.mockReturnValue({ isAuthenticated: false });
        render(
            <MemoryRouter initialEntries={['/cars']}>
                <Navbar />
            </MemoryRouter>
        );

        const browseLink = screen.getByRole('link', { name: /Browse Cars/i });
        expect(browseLink).toHaveClass('border-blue-500');

        const homeLink = screen.getByRole('link', { name: /Home/i });
        expect(homeLink).not.toHaveClass('border-blue-500');
    });
});
