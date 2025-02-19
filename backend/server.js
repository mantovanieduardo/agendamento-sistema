require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// 🟢 Rota para Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2", [username, password]);
  
  if (result.rows.length > 0) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Usuário ou senha incorretos" });
  }
});

// 🟢 Rota para Cadastro
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [username, password]);
  res.json(result.rows[0]);
});

// 🟢 Rota para criar agendamento
app.post("/agendamento", async (req, res) => {
  const { recurso, data, horario, user } = req.body;
  const result = await pool.query("INSERT INTO agendamentos (recurso, data, horario, user) VALUES ($1, $2, $3, $4) RETURNING *", [recurso, data, horario, user]);
  res.json(result.rows[0]);
});

// 🟢 Rota para listar agendamentos
app.get("/agendamentos", async (req, res) => {
  const result = await pool.query("SELECT * FROM agendamentos");
  res.json(result.rows);
});

// 🟢 Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
