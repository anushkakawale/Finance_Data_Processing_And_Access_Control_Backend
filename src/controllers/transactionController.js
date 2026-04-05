const { Transaction, User } = require('../models');
const { Op } = require('sequelize');

const createTransaction = async (req, res, next) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    const transaction = await Transaction.create({
      amount,
      type,
      category,
      date: date || new Date(),
      notes,
      createdBy: req.user.id,
    });

    res.status(201).json({ message: 'Transaction created successfully!', transaction });
  } catch (error) {
    next(error);
  }
};

const getTransactions = async (req, res, next) => {
  try {
    const { startDate, endDate, category, type, minAmount, maxAmount } = req.query;

    const where = {};

    // Filters
    if (startDate && endDate) {
      where.date = { [Op.between]: [new Date(startDate), new Date(endDate)] };
    } else if (startDate) {
      where.date = { [Op.gte]: new Date(startDate) };
    } else if (endDate) {
      where.date = { [Op.lte]: new Date(endDate) };
    }

    if (category) where.category = category;
    if (type) where.type = type;

    if (minAmount || maxAmount) {
      where.amount = {};
      if (minAmount) where.amount[Op.gte] = parseFloat(minAmount);
      if (maxAmount) where.amount[Op.lte] = parseFloat(maxAmount);
    }

    const transactions = await Transaction.findAll({
      where,
      order: [['date', 'DESC']],
      include: [
        { model: User, attributes: ['username', 'email'] }
      ]
    });

    res.status(200).json({ count: transactions.length, transactions });
  } catch (error) {
    next(error);
  }
};

const updateTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amount, type, category, date, notes } = req.body;

    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }

    await transaction.update({ amount, type, category, date, notes });

    res.status(200).json({ message: 'Transaction updated successfully!', transaction });
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }

    await transaction.destroy();

    res.status(200).json({ message: 'Transaction deleted successfully!' });
  } catch (error) {
    next(error);
  }
};

const getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findByPk(id, {
      include: [{ model: User, attributes: ['username', 'email'] }]
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found.' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getTransactionById,
};
