const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(
  "https://vndzggolhadnddrnvsdk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZuZHpnZ29saGFkbmRkcm52c2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5NDQ4OTQsImV4cCI6MjAzMjUyMDg5NH0.Ml2Prcylfad3twqf-lqjroGrvfpBxwWtlMeISQXzvmA",
);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "projDevWeb-Main")));

app.set("views", path.join(__dirname, "projDevWeb-Main"));
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Página inicial
app.get("/", async (req, res) => {
  const { data, error } = await supabase.from("medicos").select("*");

  if (error) {
    res.status(500).send("Error fetching medicos");
  } else {
    res.render("index", { medicos: data });
  }
});

// Página de registro
app.get("/registrar", (req, res) => {
  res.render("registrar");
});

// Página login
app.get("/login", (req, res) => {
  res.render("login");
});

// Página de busca
app.get("/busca", async (req, res) => {
  const { data, error } = await supabase.from("medicos").select("*");

  if (error) {
    res.status(500).send("Error fetching medicos");
  } else {
    res.render("busca", { medicos: data });
  }
});

// Página de cadastro
app.get("/areamedico", (req, res) => {
  res.render("areamedico");
});

// Página de acessodocliente
app.get("/areacliente", (req, res) => {
  res.render("areacliente");
});

//envio do registro para o banco de dados
app.post("/cadastro", async (req, res) => {
  const { nome, senha, endereco } = req.body;
  if (!nome || !senha || !endereco) {
    return res.send("Todos os campos são obrigatórios.");
  }
  await db.query(
    "INSERT INTO users (nome, senha, endereco) VALUES ($1, $2, $3)",
    [nome, senha, endereco],
  );
  res.send("Cadastro realizado com sucesso.");
});
