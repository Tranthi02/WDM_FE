import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Wrapper from '../assets/wrappers/DatePickWrapper';

const DatePick = ({ title, handleDateChange, keyValue, value }) => {
  return (
    <Wrapper className="date-wrapper">
      <label>{title}</label>
      <DatePicker
        value={dayjs(value)}
        onChange={(newValue) => handleDateChange(keyValue, newValue.toDate())}
      />
    </Wrapper>
  );
};
export default DatePick;
