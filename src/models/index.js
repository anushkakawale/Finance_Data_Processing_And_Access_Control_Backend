const User = require('./User');
const Transaction = require('./Transaction');

// User and Transaction Relationship (one-to-many)
User.hasMany(Transaction, { foreignKey: 'createdBy', onDelete: 'CASCADE' });
Transaction.belongsTo(User, { foreignKey: 'createdBy' });

module.exports = {
  User,
  Transaction,
};
