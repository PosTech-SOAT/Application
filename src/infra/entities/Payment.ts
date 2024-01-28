export interface IMercadoPagoItem {
  sku_number: string;
  category: string;
  title: string;
  description: string;
  unit_price: number;
  quantity: number;
  unit_measure: string;
  total_amount: number;
}

export interface IMercadoPagoPayment {
  cash_out: {
    amount: number;
  };
  description: string;
  external_reference: string;
  items: IMercadoPagoItem[];
  notification_url: string;
  sponsor: {
    id: number;
  };
  title: string;
  total_amount: number;
}

export interface IMercadoPagoPaymentResponse {
  qr_data: string;
  in_store_order_id: string;
}
