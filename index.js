const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;
const fs = require("fs");
const path = require("path");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const notes = require('./db/db.json');

app.get('/api/notes', (req, res) => {
  res.json(notes.slice(1));
});




app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
