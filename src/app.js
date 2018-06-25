import express from 'express';
import parseCookies from './middlewares/parse-cookies.js';
import parseQuery from './middlewares/parse-query.js';
import authCheck from './middlewares/auth-check.js';
import router from './routes/index.js';
import routerAuth from './routes/auth.js';
import bodyParser from 'body-parser';

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
