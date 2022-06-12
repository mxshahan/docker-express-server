const mongoose = require('mongoose');

mongoose
  .connect('mongodb://root:example@mongo:27017?authSource=admin')
  .then(() => {
    console.log('Database successfully conntected');
  })
  .catch((e) => {
    console.log('Error: Connection Error',  e);
  });
