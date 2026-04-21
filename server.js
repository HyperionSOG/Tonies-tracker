import express from "express";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test Route
app.get("/", (req, res) => {
  res.send("Tonie Tracker läuft!");
});

// Alle Tonies
app.get("/tonies", async (req, res) => {
  const result = await pool.query("SELECT * FROM tonies");
  res.json(result.rows);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
