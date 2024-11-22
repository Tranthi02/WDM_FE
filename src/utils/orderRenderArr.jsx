export const allOrdersTableHeader = [
  {
    Header: 'Id',
    accessor: 'id',
  },
  {
    Header: 'Customer',
    accessor: 'customer_name',
  },
  {
    Header: 'Phone',
    accessor: 'phone',
  },
  {
    Header: 'Lobby',
    accessor: 'lobby_name',
  },
  {
    Header: 'Shift',
    accessor: 'shift',
  },
  {
    Header: 'Date',
    accessor: 'wedding_date',
  },
  {
    Header: 'Tol.table',
    accessor: 'table_count',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
];

export const orderInfoLeft = [
  { title: 'groom', key: 'groom' },
  { title: 'bride', key: 'bride' },
  { title: 'phone', key: 'phone' },
  { title: 'order date', key: 'created_at', type: 'date' },
  { title: 'occur date', key: 'wedding_date', type: 'date' },
  { title: 'note', key: 'note' },
];

export const orderInfoRight = [
  { title: 'total table', key: 'table_count' },
  { title: 'total food price', key: 'food_total_price', openModal: 'food' },
  {
    title: 'total service price',
    key: 'service_total_price',
    openModal: 'service',
  },
  { title: 'total', key: 'total_price' },
  { title: 'deposit', key: 'deposit_amount' },
  { title: 'extra fee', key: 'extra_fee' },
  { title: 'remainder', key: 'remain_amount' },
];

export const reviewOrderLeft = [
  { title: 'groom', key: 'groom' },
  { title: 'bride', key: 'bride' },
  { title: 'phone', key: 'phone' },
  { title: 'order date', key: 'created_at', type: 'date' },
  { title: 'occur date', key: 'wedding_date', type: 'date' },
];

export const reviewOrderRight = [
  { title: 'total table', key: 'table_count' },
  { title: 'total food price', key: 'foodPrice' },
  { title: 'total service price', key: 'servicePrice' },
  { title: 'total', key: 'totalPrice' },
  { title: 'deposit', key: 'deposit_amount' },
  { title: 'remainder', key: 'remainPrice' },
];

export const editOrderLeft = [
  { title: 'groom', key: 'groom', type: 'text-input' },
  { title: 'bride', key: 'bride', type: 'text-input' },
  { title: 'phone', key: 'phone', type: 'text-input' },
  { title: 'note', key: 'note', type: 'text-input' },
];

export const editOrderRight = [
  { title: 'total table', key: 'table_count', type: 'text-input' },
  {
    title: 'total food price',
    key: 'food_total_price',
    openModal: 'food',
    edit: true,
  },
  {
    title: 'total service price',
    key: 'service_total_price',
    openModal: 'service',
    edit: true,
  },
  { title: 'total', key: 'total_price' },
  { title: 'deposit', key: 'deposit_amount' },
  { title: 'remainder', key: 'remain_amount' },
];

export const payRemainderOverall = [
  { title: 'total table', key: 'table_count' },
  { title: 'total food price', key: 'food_total_price' },
  { title: 'total service price', key: 'service_total_price' },
  { title: 'total', key: 'total_price' },
  { title: 'deposit', key: 'deposit_amount' },
  { title: 'extra fee', key: 'extra_fee' },
  { title: 'remainder', key: 'remain_amount' },
];

export const paymentMethodRadio = [
  { title: 'cash', key: 'payMethod', type: 'radio', optionValue: 'cash' },
  {
    title: 'internet banking',
    key: 'payMethod',
    type: 'radio',
    optionValue: 'bank',
  },
];

export const getUserInfo = [
  {
    key: 'groom',
    title: 'groom',
  },
  {
    key: 'bride',
    title: 'bride',
  },
  {
    key: 'phone',
    title: 'contact phone',
    type: 'number',
  },
  {
    key: 'table_count',
    title: 'total table',
    type: 'number',
  },
  {
    key: 'note',
    title: 'note',
  },
];

export const paymentOverall = [
  {
    key: 'table_count',
    title: 'total table',
  },
  {
    key: 'food_total_price',
    title: 'total food price',
  },
  {
    key: 'service_total_price',
    title: 'total service price',
  },
  {
    key: 'requiredDeposit',
    title: 'min deposit',
  },
];

export const paymentOption = [
  { title: 'deposit', key: 'payOption', value: 'deposit' },
  { title: 'pay in full', key: 'payOption', value: 'full' },
];

export const shift = ['evening', 'noon'];
