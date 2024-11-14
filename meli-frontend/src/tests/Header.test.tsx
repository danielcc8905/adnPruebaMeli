import { render, screen } from '@testing-library/react';
import Header from '../components/Header'; 
import '@testing-library/jest-dom';

describe('Header', () => {
  it('debería renderizar correctamente el título y el subtítulo', () => {
    render(<Header />);

    expect(screen.getByText('¿Eres un mutante?')).toBeInTheDocument();

    expect(screen.getByText('¡Sabias que más del 50% de la población porta mutaciones genéticas!')).toBeInTheDocument();
  });

  it('debería aplicar las clases CSS correctas al header y los textos', () => {
    const { container } = render(<Header />);

    const header = container.querySelector('header');
    expect(header).toHaveClass('header');  

    const title = screen.getByText('¿Eres un mutante?');
    expect(title).toHaveClass('title');  

    const subtitle = screen.getByText('¡Sabias que más del 50% de la población porta mutaciones genéticas!');
    expect(subtitle).toHaveClass('subtitle'); 
  });
});
