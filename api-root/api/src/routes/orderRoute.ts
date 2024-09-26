import { Router } from 'express';
import Order, { IOrder } from '../models/orderModel';

const router = Router();

router.post('/order', async (req, res) => {
  try {
    const newOrder: IOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred.' });
    }
  }
});

router.get('/order/latest', async (req, res) => {
  try {
    // Normal Code: get the newest order from MongoDB
    // const latestOrder = await Order.findOne().sort({ createdAt: -1 });

    // Added the 10-minute condition
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const latestOrder = await Order.findOne({
      createdAt: { $gte: tenMinutesAgo }
    }).sort({ createdAt: -1 });

    if (latestOrder) {
      res.json(latestOrder);
    } else {
      res.status(404).json({ message: 'No orders found.' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred.' });
    }
  }
});

export default router;
