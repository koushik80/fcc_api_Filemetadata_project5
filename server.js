const express = require('express');
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose');
const app = express();
const multer  = require('multer');

//DB connection
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  });


// Middlware
app.use(cors());
app.use(express.json());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

//upload file 
const upload = multer();
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  try {
    return res.status(200).json({
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    });
  } catch (error) {
    console.error(error);
  }
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Backend server is running!")

});