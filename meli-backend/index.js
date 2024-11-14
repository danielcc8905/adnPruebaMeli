import express from "express";
import db from "./db.js";
import isMutant from "./isMutant.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

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
    return res.status(200).send("Mutante");
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
