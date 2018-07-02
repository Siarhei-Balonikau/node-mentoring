import express from 'express';
import parseCookies from './middlewares/parse-cookies.js';
import parseQuery from './middlewares/parse-query.js';
import authCheck from './middlewares/auth-check.js';
import router from './routes/index.js';
import routerAuth from './routes/auth.js';
import bodyParser from 'body-parser';
import Sequelize from 'sequelize';

const sequelize = new Sequelize('postgres', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const app = express();

app.use(parseCookies);
app.use(parseQuery);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(authCheck);
app.use('/api', router);
app.use('/auth', routerAuth);

app.get('*', (req, res) => res.send('Other pages'));

export default app;
