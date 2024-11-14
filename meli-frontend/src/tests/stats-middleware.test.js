import axiosInstance from "@/utils/axiosConfig";  // asegúrate de que esta es la instancia que quieres testear
import AxiosMockAdapter from "axios-mock-adapter";
import { fetchStats } from "../services/stats-middleware";

const mock = new AxiosMockAdapter(axiosInstance); // usa axiosInstance para el mock

describe("fetchStats", () => {
  beforeEach(() => {
    mock.reset();
  });

  it("debería retornar los stats cuando la respuesta es exitosa", async () => {
    mock.onGet("/stats").reply(200, {
      stats: {
        count_mutant_dna: 3,
        count_human_dna: 2,
        ratio: 0.6
      }
    });

    const result = await fetchStats();

    expect(result).toEqual({
      stats: {
        count_mutant_dna: 3,
        count_human_dna: 2,
        ratio: 0.6
      }
    });
  });

  it("debería manejar errores si la API falla", async () => {
    mock.onGet("/stats").reply(500);

    const result = await fetchStats();

    expect(result).toBeUndefined();
  });
});
