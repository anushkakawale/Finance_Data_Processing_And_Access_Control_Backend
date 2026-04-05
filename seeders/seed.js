const { User, Transaction } = require('../src/models');
const sequelize = require('../src/config/database');

const seedData = async () => {
  try {
    // 1. Sync DB
    await sequelize.sync({ force: true });
    console.log('Database synced for seeding!');

    // 2. Create Users
    const admin = await User.create({
      username: 'admin_user',
      email: 'admin@finance.com',
      password: 'password123',
      role: 'Admin',
      status: 'Active'
    });

    const analyst = await User.create({
      username: 'analyst_user',
      email: 'analyst@finance.com',
      password: 'password123',
      role: 'Analyst',
      status: 'Active'
    });

    const viewer = await User.create({
      username: 'viewer_user',
      email: 'viewer@finance.com',
      password: 'password123',
      role: 'Viewer',
      status: 'Active'
    });

    console.log('Users seeded!');

    // 3. Create Transactions
    const transactions = [
      { amount: 5000.00, type: 'Income', category: 'Salary', date: new Date('2024-03-01'), notes: 'March Salary', createdBy: admin.id },
      { amount: 1500.00, type: 'Expense', category: 'Rent', date: new Date('2024-03-02'), notes: 'Monthly rent', createdBy: admin.id },
      { amount: 200.00, type: 'Expense', category: 'Food', date: new Date('2024-03-05'), notes: 'Grocery shopping', createdBy: admin.id },
      { amount: 1200.00, type: 'Income', category: 'Freelance', date: new Date('2024-03-10'), notes: 'Web development project', createdBy: admin.id },
      { amount: 50.00, type: 'Expense', category: 'Utilities', date: new Date('2024-03-12'), notes: 'Electricity bill', createdBy: admin.id },
      { amount: 300.00, type: 'Expense', category: 'Entertainment', date: new Date('2024-03-15'), notes: 'Movies and dinner', createdBy: admin.id },
      { amount: 5200.00, type: 'Income', category: 'Salary', date: new Date('2024-04-01'), notes: 'April Salary', createdBy: admin.id },
      { amount: 1600.00, type: 'Expense', category: 'Rent', date: new Date('2024-04-02'), notes: 'Increased monthly rent', createdBy: admin.id },
    ];

    await Transaction.bulkCreate(transactions);
    console.log('Transactions seeded!');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

seedData();
