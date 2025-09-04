require('dotenv').config({ path: __dirname + '/../.env' }); // Explicit path

const express = require('express');
const mongoose = require('mongoose');
const marksheetRoutes = require('./routes/marksheetRoutes');

const app = express();
app.use(express.json());

console.log('MONGO_URI:', process.env.MONGO_URI); // Should print your URI

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/marksheet', marksheetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));