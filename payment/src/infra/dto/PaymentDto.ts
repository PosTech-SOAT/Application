export class PaymentDto {
	products: {
    id: string;
    name: string;
    description: string;
    price: number;
  }[];
	payer: {
    email: string;
  };
	back_urls: {
    success: string;
    failure: string;
    pending: string;
  };
	auto_return: string;
	external_reference: string;
}
