export interface PaymentWebhookRequestParams {
	collection_id: number;
	//approved, etc..
	collection_status: string;
	payment_id: number;
	status: string;
	external_reference: string;
	// e.g.: credit_card...
	payment_type: string;
	merchant_order_id: number;
	preference_id: string;
	// e.g.: MLB
	site_id: string;
	// e.g.: aggregator
	processing_mode: string;
	merchant_account_id: string | null;
}
