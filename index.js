const app = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const readFromFile = (filepath) => {
  try {
    const content = fs.readFileSync(filepath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    throw new error.message();
  }
};

const writeTofile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, data);
  } catch (error) {
    throw new error.message();
  }
};

const readAndAppend = (data, filePath) => {
  try {
    const content = readFromFile(filePath);
    content.psuh(data);
    writeTofile(filePath, JSON.stringify(content));
  } catch (error) {
    console.log(error.message);
  }
};

const NOTES_FILE_PATH = path.join(__dirname, "./db/db.json");

const getNotes = (req, res) => {
    try {
        const notes = readFromFile(NOTES_FILE_PATH);
    
        return res.json(notes);
      } catch (error) {
        res.status(500).json({ succss: false, message: error.message });
      }
};
