// tests/isMutant.test.js

import isMutant from '../isMutant';


describe('isMutant', () => {
  test('debe devolver true si hay al menos 2 secuencias mutantes', () => {
    const dna = [
      ['A', 'A', 'A', 'A'],
      ['T', 'T', 'T', 'T'],
      ['C', 'C', 'C', 'C'],
      ['G', 'G', 'G', 'G']
    ];

    const result = isMutant(dna);
    expect(result).toBe(true);
  });

  test('debe devolver false si no hay secuencias mutantes', () => {
    const dna = [
      ['A', 'T', 'C', 'G'],
      ['C', 'A', 'T', 'G'],
      ['G', 'C', 'A', 'T'],
      ['T', 'G', 'C', 'A']
    ];

    const result = isMutant(dna);
    expect(result).toBe(false);
  });

  test('debe devolver true si hay secuencias mutantes en direcciones diagonales', () => {
    const dna = [
      ['A', 'T', 'C', 'G'],
      ['A', 'T', 'C', 'G'],
      ['A', 'T', 'C', 'G'],
      ['A', 'T', 'C', 'G']
    ];

    const result = isMutant(dna);
    expect(result).toBe(true);
  });

  test('debe devolver false para una matriz vacía', () => {
    const dna = [];
    const result = isMutant(dna);
    expect(result).toBe(false);
  });
});
