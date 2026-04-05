const app = require('./app');
const sequelize = require('./config/database');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Sync database and start server
sequelize.sync({ force: false }).then(() => {
  console.log('--- Database Connected Successfully! ---');
  console.log(`--- SQLite DB stored at: ${process.env.DB_PATH || 'database.sqlite'} ---`);

  app.listen(PORT, () => {
    console.log(`--- Server is running on port: ${PORT} ---`);
    console.log(`--- Environment: ${process.env.NODE_ENV || 'production'} ---`);
    console.log(`--- Documentation available at: /api/docs (if implemented) or check README ---`);
  });
}).catch(err => {
  console.error('--- Unable to connect to the database: ---', err);
});
