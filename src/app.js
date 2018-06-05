import express from 'express';
import parseCookies from './middlewares/parse-cookies.js';
import parseQuery from './middlewares/parse-query.js';
import router from './routes/index.js';

const app = express();

app.use(parseCookies);
app.use(parseQuery);

app.use('/api', router);

app.get('*', (req, res) => res.send('Other pages'));

export default app;
