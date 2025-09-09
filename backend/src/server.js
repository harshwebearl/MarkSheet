require('dotenv').config({ path: __dirname + '/../.env' }); // Explicit path

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const marksheetRoutes = require('./routes/marksheetRoutes');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../../frontend')));

console.log('MONGO_URI:', process.env.MONGO_URI); // Should print your URI

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/marksheet', marksheetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));