const mongoose = require('mongoose');

const connectDatabaseWithRetry = () => {
  mongoose
    .connect('mongodb://root:example@mongo:27017?authSource=admin')
    .then(() => {
      console.log('Database successfully conntected');
    })
    .catch((e) => {
      setTimeout(connectDatabaseWithRetry, 5000);
      console.log('Error: Connection Error', e);
    });
};

connectDatabaseWithRetry();
