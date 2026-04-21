import express from "express";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(express.json());

let pool;

// 🔥 DB sicher initialisieren
try {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  console.log("DB verbunden");
} catch (err) {
  console.error("DB Fehler:", err);
}

// ✅ Test Route (wichtig!)
app.get("/", (req, res) => {
  res.send("Server läuft!");
});

// ✅ Tonies Route (mit Fehlerabfang)
app.get("/tonies", async (req, res) => {
  try {
    if (!pool) {
      return res.status(500).send("DB nicht verfügbar");
    }

    const result = await pool.query("SELECT * FROM tonies");
    res.json(result.rows);
  } catch (err) {
    console.error("Query Fehler:", err);
    res.status(500).send("DB Fehler");
  }
});

// 🔥 WICHTIG für Railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
