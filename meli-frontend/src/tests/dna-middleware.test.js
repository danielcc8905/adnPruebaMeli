import { generateRandomDna, checkIfMutant } from '../services/dna-middleware';
import axiosMock from 'axios-mock-adapter';
import axiosInstance from '@/utils/axiosConfig';

const mock = new axiosMock(axiosInstance);

describe('Utils - dnaUtils', () => {
  
  describe('generateRandomDna', () => {
    it('debería devolver un objeto con una clave dna', () => {
      const result = generateRandomDna();
      expect(result).toHaveProperty('dna');
      expect(Array.isArray(result.dna)).toBe(true);
      expect(result.dna.length).toBe(6); 
    });
  });

  describe('checkIfMutant', () => {
    it('debería devolver un mensaje de éxito si la respuesta de la API es exitosa', async () => {
      const mockResponse = { isMutant: true };
      const dna = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];

      mock.onPost('/mutant').reply(200, mockResponse);

      const result = await checkIfMutant({ dna });
      expect(result).toEqual({ message: mockResponse });
    });

    it('debería devolver un mensaje de error si la API falla', async () => {
      const dna = ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"];

      mock.onPost('/mutant').reply(500);

      const result = await checkIfMutant({ dna });
      expect(result).toEqual({ message: 'Hubo un error al verificar el ADN.' });
    });
  });

});
