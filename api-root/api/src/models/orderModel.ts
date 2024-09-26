import mongoose, { Document, Schema } from 'mongoose';

export interface IOrder extends Document {
  product: 't-shirt' | 'sweater';
  material?: 'light cotton' | 'heavy cotton';
  color: 'black' | 'white' | 'green' | 'red' | 'pink' | 'yellow';
  text: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date; 
}

const OrderSchema: Schema = new Schema({
  product: { type: String, required: true },
  material: { type: String },
  color: { type: String, required: true },
  text: { type: String, required: true },
  price: { type: Number, required: true },
}, {timestamps: true});

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
