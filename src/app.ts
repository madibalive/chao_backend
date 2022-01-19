import express from 'express';

import cors from 'cors';

import { ErrorHandler } from './helpers/apiErrorHandler';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// Routes
app.get('/', (req: express.Request, res: express.Response) => {
  console.log('Hello World');
  return res.status(200).send({ message: 'HelloWorld' });
});

/*
 * Keep error-handler as last middleware
 */
app.use(ErrorHandler);

export { app };
