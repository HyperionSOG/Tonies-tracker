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

app.listen(3000, () => {
  console.log("Server läuft auf Port 3000");
});
