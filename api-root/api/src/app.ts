import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import orderRoutes from './routes/orderRoute';
import connectDB from './config/db';

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', orderRoutes);

export {app};
