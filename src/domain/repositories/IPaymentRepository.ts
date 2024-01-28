export interface IPaymentRepository {
  createQrCodePayment(orderId: string, amount: number): Promise<any>;
}
