import { FaHotel, FaConciergeBell, FaUtensils, FaUser } from 'react-icons/fa';
import { FaChartSimple } from 'react-icons/fa6';

const links = [
  {
    text: 'lobby',
    page: 'lobby',
    path: 'lobType',
    icon: <FaHotel />,
  },
  {
    text: 'order',
    page: 'order',
    path: 'order',
    icon: <FaConciergeBell />,
  },
  {
    text: 'Thống kê',
    page: 'report',
    path: 'report',
    icon: <FaChartSimple />,
  },
  {
    text: 'Thức đơn và dịch vụ',
    page: 'food_service',
    path: 'food-service',
    icon: <FaUtensils />,
  },
  {
    text: 'Tài khoản',
    page: 'user',
    path: 'user',
    icon: <FaUser />,
  },
];

export default links;
