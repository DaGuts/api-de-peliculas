const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "catalogo_cine"
});

db.connect(err => {
  if(err){
    console.error("Error conectando a la base de datos:", err.message);
  } else {
    console.log("Conectado a MySQL correctamente.");
  }
});

app.get("/peliculas", (req, res) => {
  db.query("SELECT * FROM peliculas", (err, results) => {
    if(err){
      console.error("Error en la consulta:", err.message);
      return res.status(500).json({ error: "Error en la consulta" });
    }
    res.json(results);
  });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
