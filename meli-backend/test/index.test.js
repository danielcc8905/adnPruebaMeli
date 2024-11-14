import request from "supertest";
import express from "express";
import db from "../db.js";
import isMutant from "../isMutant.js";

// Mock de las dependencias
jest.mock("../db.js");
jest.mock("../isMutant.js");
jest.mock("lowdb/node", () => ({
  JSONFileSyncPreset: jest.fn().mockImplementation(() => ({
    read: jest.fn().mockResolvedValue({
      stats: [{ count_mutant_dna: 0, count_human_dna: 0, ratio: 0 }],
    }),
    write: jest.fn(),
  })),
}));
// Configuración de la app
const app = express();
app.use(express.json());

// Configurar las rutas
app.post("/mutant", async (req, res) => {
  const { dna } = req.body;

  if (!dna || !Array.isArray(dna)) {
    return res.status(400).send("Invalid DNA format");
  }

  const mutant = isMutant(dna);

  await db.read();

  if (mutant) {
    db.data.stats.count_mutant_dna++;
    await db.write();
    return res.status(200).send("Eres mutante");
  } else {
    db.data.stats.count_human_dna++;
    await db.write();
    return res.status(403).send("Forbidden");
  }
});

app.get("/stats", async (req, res) => {
  await db.read();

  const { count_mutant_dna, count_human_dna } = db.data.stats;
  const ratio = count_human_dna === 0 ? 0 : count_mutant_dna / count_human_dna;

  res.json({
    count_mutant_dna,
    count_human_dna,
    ratio: ratio.toFixed(2),
  });
});

describe("API Mutant Tests", () => {
  beforeAll(() => {
    db.read.mockResolvedValue();
    db.write.mockResolvedValue();
    db.data = { stats: { count_mutant_dna: 0, count_human_dna: 0, ratio: 0 } };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /mutant", () => {
    it("debería devolver 200 si el ADN es mutante", async () => {
      isMutant.mockReturnValue(true);

      const response = await request(app)
        .post("/mutant")
        .send({ dna: ["ATG", "CGA", "GTT"] });

      expect(response.status).toBe(200);
      expect(response.text).toBe("Eres mutante");
      expect(db.write).toHaveBeenCalledTimes(1);
      expect(db.data.stats.count_mutant_dna).toBe(1);
    });

    it("debería devolver 403 si el ADN no es mutante", async () => {
      isMutant.mockReturnValue(false);

      const response = await request(app)
        .post("/mutant")
        .send({ dna: ["ATG", "CGA", "CGG"] });

      expect(response.status).toBe(403);
      expect(response.text).toBe("Forbidden");
      expect(db.write).toHaveBeenCalledTimes(1);
      expect(db.data.stats.count_human_dna).toBe(1);
    });

    it("debería devolver 400 si el ADN es inválido", async () => {
      const response = await request(app)
        .post("/mutant")
        .send({ dna: "invalid" });
      expect(response.status).toBe(400);
      expect(response.text).toBe("Invalid DNA format");
    });
  });

  describe("GET /stats", () => {
    it("debería devolver las estadísticas correctamente", async () => {
      db.data.stats.count_mutant_dna = 3;
      db.data.stats.count_human_dna = 2;

      const response = await request(app).get("/stats");

      expect(response.status).toBe(200);
      expect(response.body.count_mutant_dna).toBe(3);
      expect(response.body.count_human_dna).toBe(2);
      expect(response.body.ratio).toBe("1.50"); // 3/2
    });

    it("debería devolver 0 como ratio si no hay ADN humano", async () => {
      db.data.stats.count_mutant_dna = 3;
      db.data.stats.count_human_dna = 0;
      db.data.stats.ratio = 0;

      const response = await request(app).get("/stats");

      expect(response.status).toBe(200);
      expect(response.body.count_mutant_dna).toBe(3);
      expect(response.body.count_human_dna).toBe(0);
      expect(response.body.ratio).toBe("0.00");
    });
  });
});
