import express from 'express';
import matrixRoutes from './modules/matrix/infrastructure/http/routes/matrix.routes';

import { errorMiddleware } from './modules/matrix/infrastructure/http/middlewares/error.middleware';

import cors from 'cors';
import helmet from 'helmet';


export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({
    success: true,
    data: {
      status: 'OK',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
});
});

app.use('/matrix', matrixRoutes);
app.use(errorMiddleware);

