export const customerInfo = [
  {
    title: 'Chú rể',
    key: 'groom',
  },
  {
    title: 'Cô dâu',
    key: 'bride',
  },
  {
    title: 'Số điện thoại',
    key: 'phone',
  },
  {
    title: 'Note',
    key: 'note',
  },
];

export const weddingInfo = [
  {
    title: 'Lobby',
    key: 'lobby',
  },
  {
    title: 'Sự kiện ngày',
    key: 'wedding_date',
    type: 'date'
  },
  {
    title: 'Buổi tiệc',
    key: 'shift',
  },
  {
    title: 'Tổng bàn',
    key: 'table_count',
  },
  {
    title: 'Tổng thực đơn',
    key: 'food_total_price',
    openModal: 'food',
    type: 'concurrency'
  },
  {
    title: 'Tổng dịch vụ',
    key: 'service_total_price',
    openModal: 'service',
    type: 'concurrency'
  },
  {
    title: 'Tổng',
    key: 'total_price',
    type: 'concurrency'
  },
  {
    title: 'Thiếu',
    key: 'remain_amount',
    type: 'concurrency'
  },
  {
    title: 'Đặt cọc',
    key: 'depositRequire',
    type: 'concurrency'
  },
  {
    title: 'Thuế',
    key: 'extra_fee',
    type: 'concurrency'
  },
];
