import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach,  vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CarListPage from '../pages/CarListPage';
import { useAuth } from '../contexts/AuthContext';
import { useWebSocket } from '../contexts/WebSocketContext';

vi.mock('../contexts/AuthContext');
vi.mock('../contexts/WebSocketContext');

vi.mock('../components/CarCard', () => ({
    default: ({ car }) => <div data-testid="car-card">{car.carData.carBrand} {car.carData.carModel}</div>
}));

describe('CarListPage Component', () => {
    const mockAuthFetch = vi.fn();
    const mockSubscribe = vi.fn();
    const mockUnsubscribe = vi.fn();

    const mockCars = [
        {
            advertisementId: 1,
            carData: { carBrand: 'Toyota', carModel: 'Camry', carBodyType: 'Sedan' }
        },
        {
            advertisementId: 2,
            carData: { carBrand: 'Honda', carModel: 'Civic', carBodyType: 'Sedan' }
        }
    ];

    beforeEach(() => {
        vi.clearAllMocks();

        useAuth.mockReturnValue({
            isAuthenticated: false,
            authFetch: mockAuthFetch
        });

        useWebSocket.mockReturnValue({
            subscribeToTopic: mockSubscribe,
            unsubscribeFromTopic: mockUnsubscribe
        });

        global.fetch = vi.fn();
    });

    it('shows loading state initially', async () => {
        global.fetch.mockReturnValue(new Promise(() => { }));

        render(
            <MemoryRouter>
                <CarListPage />
            </MemoryRouter>
        );

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('renders list of cars after fetch', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => mockCars
        });

        render(
            <MemoryRouter>
                <CarListPage />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
        });

        const cards = screen.getAllByTestId('car-card');
        expect(cards).toHaveLength(2);
        expect(screen.getByText('Toyota Camry')).toBeInTheDocument();
        expect(screen.getByText('Honda Civic')).toBeInTheDocument();
    });

    it('handles fetch error correctly', async () => {
        global.fetch.mockRejectedValue(new Error('Network error'));

        render(
            <MemoryRouter>
                <CarListPage />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Network error/i)).toBeInTheDocument();
        });
    });

    it('displays message when no cars found', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => []
        });

        render(
            <MemoryRouter>
                <CarListPage />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/No cars found/i)).toBeInTheDocument();
        });
    });

    it('fetches favorites if authenticated', async () => {
        useAuth.mockReturnValue({
            isAuthenticated: true,
            authFetch: mockAuthFetch
        });

        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => []
        });

        mockAuthFetch.mockResolvedValue({
            ok: true,
            json: async () => [1]
        });

        render(
            <MemoryRouter>
                <CarListPage />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(mockAuthFetch).toHaveBeenCalledWith('/api/favorites');
        });
    });

    it('updates filters when inputs change', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => []
        });

        render(
            <MemoryRouter>
                <CarListPage />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
        });

        const priceInputs = screen.getAllByPlaceholderText('0');
        const priceInput = priceInputs[0];
        fireEvent.change(priceInput, { target: { value: '1000' } });
        expect(priceInput.value).toBe('1000');
    });
});
