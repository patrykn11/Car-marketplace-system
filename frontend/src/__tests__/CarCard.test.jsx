import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { useAuth } from '../contexts/AuthContext';
import { useWebSocket } from '../contexts/WebSocketContext';

vi.mock('../contexts/AuthContext');
vi.mock('../contexts/WebSocketContext');

describe('CarCard Component', () => {
    const mockAuthFetch = vi.fn();
    const mockSubscribe = vi.fn();
    const mockUnsubscribe = vi.fn();

    const mockCar = {
        advertisementId: 1,
        username: 'ownerUser',
        hasImage: false,
        carData: {
            carBrand: 'Toyota',
            carModel: 'Corolla',
            productionYear: 2020,
            mileage: 50000,
            price: 60000
        }
    };

    beforeEach(() => {
        vi.clearAllMocks();

        useWebSocket.mockReturnValue({
            subscribeToTopic: mockSubscribe,
            unsubscribeFromTopic: mockUnsubscribe
        });
    });

    it('renders car information correctly', () => {
        useAuth.mockReturnValue({
            isAuthenticated: false
        });

        render(
            <MemoryRouter>
                <CarCard car={mockCar} />
            </MemoryRouter>
        );

        expect(screen.getByText(/Toyota Corolla/i)).toBeInTheDocument();
        expect(screen.getByText(/60,000 PLN/i)).toBeInTheDocument();
        expect(screen.getByText(/2020/i)).toBeInTheDocument();
    });

    it('shows favorite button for authenticated non-owner user', () => {
        useAuth.mockReturnValue({
            isAuthenticated: true,
            username: 'otherUser',
            authFetch: mockAuthFetch
        });

        render(
            <MemoryRouter>
                <CarCard car={mockCar} isFavoriteInitial={false} />
            </MemoryRouter>
        );

        const favButton = screen.getByTitle(/Add to favorites/i);
        expect(favButton).toBeInTheDocument();
    });

    it('does not show favorite button for owner', () => {
        useAuth.mockReturnValue({
            isAuthenticated: true,
            username: 'ownerUser',
            authFetch: mockAuthFetch
        });

        render(
            <MemoryRouter>
                <CarCard car={mockCar} />
            </MemoryRouter>
        );

        expect(screen.queryByTitle(/Add to favorites/i)).not.toBeInTheDocument();
    });

    it('toggles favorite status on click', async () => {
        useAuth.mockReturnValue({
            isAuthenticated: true,
            username: 'otherUser',
            authFetch: mockAuthFetch
        });
        mockAuthFetch.mockResolvedValue({ ok: true });

        render(
            <MemoryRouter>
                <CarCard car={mockCar} isFavoriteInitial={false} />
            </MemoryRouter>
        );

        const favButton = screen.getByTitle(/Add to favorites/i);
        fireEvent.click(favButton);

        await waitFor(() => {
            expect(mockAuthFetch).toHaveBeenCalledWith('/api/favorites/1', { method: 'POST' });
        });
    });
});
