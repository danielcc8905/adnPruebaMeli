import { JSONFileSyncPreset } from "lowdb/node";
import db from "../db.js";

jest.mock("lowdb/node", () => ({
  JSONFileSyncPreset: jest.fn().mockImplementation(() => ({
    read: jest.fn().mockResolvedValue({
      stats: [{ count_mutant_dna: 0, count_human_dna: 0, ratio: 0 }],
    }),
  })),
}));

describe("Base de datos", () => {
  let dbInstance;

  beforeAll(() => {
    dbInstance = db;
  });

  it("debe inicializarse correctamente", async () => {
    expect(JSONFileSyncPreset).toHaveBeenCalledWith("db.json", {
      stats: [{ count_mutant_dna: 0, count_human_dna: 0, ratio: 0 }],
    });
    expect(dbInstance.read).toHaveBeenCalledTimes(1);
  });

  it("debe tener los datos predeterminados", async () => {
    const data = await dbInstance.read();
    expect(data).toEqual({
      stats: [{ count_mutant_dna: 0, count_human_dna: 0, ratio: 0 }],
    });
  });
});
