const express = require('express');
const router = express.Router();
const marksheetController = require('../controllers/marksheetController');

router.post('/marksheets', marksheetController.createMarksheet);
router.get('/marksheets', marksheetController.getAllMarksheets);
router.get('/marksheets/:rollno', marksheetController.getMarksheetByRollno);
router.put('/marksheets/:rollno', marksheetController.updateMarksheet);
router.delete('/marksheets/:rollno', marksheetController.deleteMarksheet);

module.exports = router;