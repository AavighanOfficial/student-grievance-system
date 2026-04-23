const express = require('express');
const router = express.Router();
const grievanceController = require('../controllers/grievanceController');
const auth = require('../middleware/authMiddleware');

// Get search results - needs to be before /:id to not be interpreted as an id
router.get('/grievances/search', auth, grievanceController.searchGrievances);

// Standard CRUD operations
router.post('/grievances', auth, grievanceController.createGrievance);
router.get('/grievances', auth, grievanceController.getGrievances);
router.get('/grievances/:id', auth, grievanceController.getGrievanceById);
router.put('/grievances/:id', auth, grievanceController.updateGrievance);
router.delete('/grievances/:id', auth, grievanceController.deleteGrievance);

module.exports = router;
