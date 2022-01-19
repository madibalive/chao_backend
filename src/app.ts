import express from 'express';

import cors from 'cors';
import helmet from 'helmet';
import { bootstrap } from './config/functions/bootstrap';

import { ErrorHandler } from './helpers/apiErrorHandler';
import { apiLogger } from './helpers/logger';

const app = express();

// Middlewares
app.use(cors());
// app.use(helmet());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// Middleware to logs api request
app.use(apiLogger);

// Routes
app.get('/', (req: express.Request, res: express.Response) => {
  console.log('Hello World');
  return res.status(200).send({ message: 'HelloWorld' });
});

app.use('/public', express.static('public/'));

/*
 * Keep error-handler as last middleware
 */
app.use(ErrorHandler);

// Bootstrap function runs before staring app
bootstrap(app);

export { app };
