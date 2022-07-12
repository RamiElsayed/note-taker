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

const createNewNote = (body, notes) => {
    const newNote = body;
    if (!Array.isArray(notes)) {
      notes = [];
    }

    if (notes.length === 0) {
      notes.push(0);

      body.id = notes[0];
      notes[0]++;

      notes.push(newNote);
      fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes, null, 2)
      );

      return newNote;
    }
}

app.post('api/notes', (req,res) => {
  const note = createNewNote(req.body, notes);
  res.json(note);
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
