
import axiosInstance from '@/utils/axiosConfig';
import { ResponseMutation } from '@/types/mutation';

export const generateRandomDna = () => {
  const dnaMutant = {
    dna: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
  };

  const dnaHuman = {
    dna: ["ATGCGA", "CAGTGC", "TTATTT", "AGACGG", "GCGTCA", "TCACTG"]
  };

  return Math.random() < 0.5 ? dnaMutant : dnaHuman;
};

export const checkIfMutant = async (body: { dna: string[] }): Promise<ResponseMutation> => {
  try {
    const response = await axiosInstance.post('/mutant', body);
    return { message: response.data };
  } catch (error) {
    console.error('Error:', error);
    return { message: 'Hubo un error al verificar el ADN.' };
  }
};
