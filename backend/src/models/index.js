import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('users', UserSchema);

const OrderSchema = new Schema({
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  shipDate: { type: Date, required: true },
  status: { type: String }
});
const Order = mongoose.model('order', OrderSchema);

export { User, Order };
