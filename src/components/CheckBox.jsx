import Wrapper from '../assets/wrappers/CheckBoxWrapper';

const CheckBox = ({ title, value, keyValue, handleChange }) => {
  return (
    <Wrapper className="checkbox-wrapper">
      <input
        type="checkbox"
        id={keyValue}
        name={keyValue}
        checked={value}
        onChange={handleChange}
      />
      <label htmlFor={keyValue} className={value ? 'checked' : ''}>
        {title}
      </label>
    </Wrapper>
  );
};
export default CheckBox;
