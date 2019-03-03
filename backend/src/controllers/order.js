import { Order } from '../models';
import setJob from '../utils/paymentProcess';


const getOrders = (req, res) => {
  Order.find()
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => res.status(500).send(err));
};

const createOrder = (req, res) => {
  let { category, quantity, shipDate } = req.body;
  const newOrder = new Order({
    category: category,
    quantity: quantity,
    shipDate: shipDate,
    status: 'created'
  });

  newOrder
    .save()
    .then((doc) => {
      res.json(doc);
      setJob(doc._id);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const updateOrder = (req, res) => {
  Order.findById(req.params.id, (err, doc) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!doc) {
      res.status(404).send('data is not found');
    } else {
      doc.category = req.body.category;
      doc.quantity = req.body.quantity;
      doc.shipDate = new Date(req.body.shipDate);
      doc.status = req.body.status;

      doc
        .save()
        .then((newDoc) => {
          res.json(newDoc);
        })
        .catch((err) => res.status(500).send(err));
    }
  });
};

const deleteOrder = (req, res) => {
  Order.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

export { getOrders, createOrder, updateOrder, deleteOrder };
