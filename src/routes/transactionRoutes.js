const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authenticate = require('../middlewares/auth');
const authorize = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const { transactionSchema } = require('../utils/validators');

// Authentication middleware applied to all routes
router.use(authenticate);

// List transactions: Analyst and Admin
router.get('/', authorize(['Analyst', 'Admin']), transactionController.getTransactions);

// View transaction by ID: Analyst and Admin
router.get('/:id', authorize(['Analyst', 'Admin']), transactionController.getTransactionById);

// Create transaction: Admin only
router.post('/', authorize(['Admin']), validate(transactionSchema), transactionController.createTransaction);

// Update/Delete: Admin only
router.put('/:id', authorize(['Admin']), validate(transactionSchema), transactionController.updateTransaction);
router.delete('/:id', authorize(['Admin']), transactionController.deleteTransaction);

module.exports = router;
