const express = require('express');
const path = require('path');
const routesHandler = require('./routes');
const errorHandler = require('./middleware/errorHandler');

// REDIS CONFIGURATION
const session = require('express-session');
const redis = require('redis');
const { REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/constant');
const RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
})

// redisClient.on('connect', () => console.log('Connected to Redis!'));
// redisClient.on('error', (err) => console.log('Redis Client Error', err));
// redisClient.connect();

const app = express();

require('./config/db');


// Middleware
app.use(express.json());

errorHandler(app);

// Redis Middleware
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //   secure: false,
    //   httpOnly: true,
    //   maxAge: 30000,
    // },
  })
);

// app.use(function (req, res, next) {
//   if (!req.session) {
//     return next(new Error("oh no")) // handle error
//   }
//   next() // otherwise continue
// })

// All Routes
app.use('/api/v1', routesHandler);



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  res.render('index', {
    name: 'Docker',
    title: 'Setup docker compose and run docker',
  });
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening port ${port}`));
