const moneyAttribute = [
  'pricePerTable',
  'serviceFee',
  'total',
  'deposit',
  'remainder',
  'extraFee',
  'min_table_price',
  'requiredDeposit',
  'totalPrice',
  'deposit_amount',
  'servicePrice',
  'foodPrice',
  'remain',
  'total_price',
  'remain_amount',
  'service_total_price',
  'food_total_price',
  'extra_fee',
];

export default (data) => {
  if (moneyAttribute.includes(data)) return '$';
};
