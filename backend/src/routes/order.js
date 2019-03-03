import passport from 'passport';
import { getOrders, createOrder, updateOrder, deleteOrder } from '../controllers/order';

function setupOrderRoutes(router) {
  // GET -- List Orders
  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    getOrders
  );

  // POST -- Create Order
  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    createOrder
  );

  // PUT -- Update Order
  router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    updateOrder
  );

  // DELETE -- Delete Order
  router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    deleteOrder
  );
}

export default setupOrderRoutes;
