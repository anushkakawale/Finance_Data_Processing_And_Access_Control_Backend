const { Transaction } = require('../models');
const { Op, fn, col } = require('sequelize');

const getDashboardSummary = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const whereClause = {};
    if (startDate && endDate) {
      whereClause.date = { [Op.between]: [new Date(startDate), new Date(endDate)] };
    }

    // 1. Total Income and Total Expenses
    const income = await Transaction.sum('amount', {
      where: { ...whereClause, type: 'Income' }
    }) || 0;

    const expenses = await Transaction.sum('amount', {
      where: { ...whereClause, type: 'Expense' }
    }) || 0;

    const netBalance = income - expenses;

    // 2. Category-wise Totals
    const categoryTotals = await Transaction.findAll({
      attributes: [
        'category',
        'type',
        [fn('SUM', col('amount')), 'totalAmount']
      ],
      where: whereClause,
      group: ['category', 'type'],
      order: [[fn('SUM', col('amount')), 'DESC']]
    });

    // 3. Recent Activity (Latest 5 transactions)
    const recentActivity = await Transaction.findAll({
      limit: 5,
      order: [['date', 'DESC']],
      attributes: ['id', 'amount', 'type', 'category', 'date']
    });

    // 4. Monthly Trend (Summary by month)
    // In SQLite, we can use strftime for grouping by month
    const monthlyTrends = await Transaction.findAll({
      attributes: [
        [fn('strftime', '%Y-%m', col('date')), 'month'],
        'type',
        [fn('SUM', col('amount')), 'totalAmount']
      ],
      where: whereClause,
      group: [fn('strftime', '%Y-%m', col('date')), 'type'],
      order: [[fn('strftime', '%Y-%m', col('date')), 'ASC']]
    });

    res.status(200).json({
      summary: {
        totalIncome: income,
        totalExpenses: expenses,
        netBalance: netBalance,
      },
      categoryWiseTotals: categoryTotals,
      recentActivity: recentActivity,
      monthlyTrends: monthlyTrends,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardSummary,
};
