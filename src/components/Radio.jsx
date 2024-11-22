import Wrapper from '../assets/wrappers/RadioWrapper';

const Radio = ({ title, keyValue, value, handleChange, currValue }) => {
  return (
    <Wrapper className="radio-wrapper">
      <input
        type="radio"
        name={keyValue}
        id={value}
        value={value}
        checked={currValue === value}
        onChange={handleChange}
      />
      <label htmlFor={value}>{title}</label>
    </Wrapper>
  );
};
export default Radio;
