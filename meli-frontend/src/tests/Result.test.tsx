// src/tests/Result.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Result } from '../components/Result';
import { checkIfMutant } from '@/services/dna-middleware';
import { useRouter } from 'next/navigation';

jest.mock('@/services/dna-middleware', () => ({
  generateRandomDna: jest.fn(),
  checkIfMutant: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Result component', () => {
  const mockRouter = { refresh: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('debería renderizar los stats correctamente', () => {
    const mockStats = {
      count_mutant_dna: 10,
      count_human_dna: 5,
      ratio: 0.67,
    };

    render(<Result stats={mockStats} />);

    expect(screen.getByText('Cantidad de mutantes: 10')).toBeInTheDocument();
    expect(screen.getByText('Cantidad de humanos: 5')).toBeInTheDocument();
    expect(screen.getByText('Ratio: 0.67')).toBeInTheDocument();
  });

  it('debería mostrar el mensaje de "Eres un mutante" cuando el resultado es mutante', async () => {
    const mockStats = { count_mutant_dna: 10, count_human_dna: 5, ratio: 0.67 };
    const mockResult = { message: 'Mutante' };

    (checkIfMutant as jest.Mock).mockResolvedValue(mockResult);

    render(<Result stats={mockStats} />);

    fireEvent.click(screen.getByText('Intentalo'));

    await waitFor(() => screen.getByText('¡Felicidades, eres un mutante!'));
    expect(screen.getByText('¡Felicidades, eres un mutante!')).toBeInTheDocument();
  });

  it('debería mostrar el mensaje de "Eres un humano" cuando el resultado es humano', async () => {
    const mockStats = { count_mutant_dna: 10, count_human_dna: 5, ratio: 0.67 };
    const mockResult = { message: 'Humano' };

    (checkIfMutant as jest.Mock).mockResolvedValue(mockResult);

    render(<Result stats={mockStats} />);

    fireEvent.click(screen.getByText('Intentalo'));

    await waitFor(() => screen.getByText('Lo sentimos, eres un humano cualquiera.'));
    expect(screen.getByText('Lo sentimos, eres un humano cualquiera.')).toBeInTheDocument();
  });

  it('debería llamar a router.refresh al hacer clic en el botón', async () => {
    const mockStats = { count_mutant_dna: 10, count_human_dna: 5, ratio: 0.67 };
    const mockResult = { message: 'Mutante' };

    (checkIfMutant as jest.Mock).mockResolvedValue(mockResult);

    render(<Result stats={mockStats} />);

    fireEvent.click(screen.getByText('Intentalo'));

    await waitFor(() => expect(mockRouter.refresh).toHaveBeenCalled());
  });

  it('no debería renderizar stats si no hay stats proporcionados', () => {
    render(<Result stats={null} />);

    expect(screen.queryByText('Cantidad de mutantes:')).toBeNull();
    expect(screen.queryByText('Cantidad de humanos:')).toBeNull();
    expect(screen.queryByText('Ratio:')).toBeNull();
  });
});
