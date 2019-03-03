import schedule from 'node-schedule';
import moment from 'moment';
import { Order } from '../models';

let states = [
  {
    date: moment().add(10, 'minutes').toDate(),
    status: 'confirmed'
  },
  {
    date: moment().add(20, 'minutes').toDate(),
    status: 'delivered'
  }
];

const setJob = (id) => {
  console.log(id);
  states.forEach((obj) => {
    schedule.scheduleJob(obj.date, () => {
      updateStatus(id, obj.status);
    });
  });
};

const updateStatus = (id, status) => {
  console.log(id, status);
  Order.findById(id, (err, doc) => {
    if (err) {
      console.log(err);
    }
    doc.status = status;
    doc
      .save()
      .then((newDoc) => {
        console.log('status updated', newDoc);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export default setJob;


