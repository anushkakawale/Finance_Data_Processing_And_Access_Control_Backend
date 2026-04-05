const express = require('express');
const router = express.Router();
const { getDashboardSummary } = require('../controllers/dashboardController');
const authenticate = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get dashboard totals and analytics
 *     tags: [Dashboard]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema: { type: string, format: date }
 *       - in: query
 *         name: endDate
 *         schema: { type: string, format: date }
 *     responses:
 *       200: { description: Aggregated analytics }
 */
router.get('/summary', authenticate, authorize(['Viewer', 'Analyst', 'Admin']), getDashboardSummary);

module.exports = router;
