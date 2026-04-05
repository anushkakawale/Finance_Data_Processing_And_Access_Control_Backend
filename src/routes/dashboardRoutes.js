const express = require('express');
const router = express.Router();
const { getDashboardSummary } = require('../controllers/dashboardController');
const authenticate = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

// All authenticated roles can see the dashboard summary
router.get('/summary', authenticate, authorize(['Viewer', 'Analyst', 'Admin']), getDashboardSummary);

module.exports = router;
