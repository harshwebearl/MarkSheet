const Marksheet = require('../models/marksheetModel.js');

// Create new marksheet
exports.createMarksheet = async (req, res) => {
  try {
    const marksheet = new Marksheet(req.body);
    await marksheet.save();
    res.status(201).json(marksheet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all marksheets
exports.getAllMarksheets = async (req, res) => {
  try {
    const marksheets = await Marksheet.find();
    res.json(marksheets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get marksheet by rollno
exports.getMarksheetByRollno = async (req, res) => {
  try {
    const marksheet = await Marksheet.findOne({ rollno: req.params.rollno });
    if (!marksheet) return res.status(404).json({ error: 'Marksheet not found' });
    res.json(marksheet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update marksheet
exports.updateMarksheet = async (req, res) => {
  try {
    const marksheet = await Marksheet.findOneAndUpdate(
      { rollno: req.params.rollno },
      req.body,
      { new: true }
    );
    if (!marksheet) return res.status(404).json({ error: 'Marksheet not found' });
    res.json(marksheet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete marksheet
exports.deleteMarksheet = async (req, res) => {
  try {
    const marksheet = await Marksheet.findOneAndDelete({ rollno: req.params.rollno });
    if (!marksheet) return res.status(404).json({ error: 'Marksheet not found' });
    res.json({ message: 'Marksheet deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};