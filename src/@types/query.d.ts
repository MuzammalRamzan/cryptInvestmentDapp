interface IQuery {
  user_search_email: string;
  user_search_domain: string;
  user_search_keyword: string;
  wallet_address: string;
  created: Date;
  query_id: number;
  wallet_address: string;
  payment_status: null | string;
  query_status: null | string;
  query_result: null | any;
  stripe_order_payment_reference_id: null | any;
  payment_id: null | string;
  payment_method: null | string;
  invoice: null | string;
  user_id: null;
}
