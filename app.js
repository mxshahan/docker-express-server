const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.get('/*', function (req, res) {
  res.render('404');
});

app.get('/test', (req, res) => {
  res.send('Action runner updated');
});

app.get('/api/v1/user', (req, res) => {
  res.json({
    success: true,
    message: 'User fetched',
    user: {
      fullname: 'Hello',
      email: 'user@gmail.com',
      phone: '+880293938383',
    },
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App listening port ${port}`));
