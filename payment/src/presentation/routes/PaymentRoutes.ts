import { Router } from 'express';

const paymentRoute = Router();

const paymentController = new PaymentController();

paymentRoute.get('/payment', paymentController.listByStatus);


export default paymentRoute;
