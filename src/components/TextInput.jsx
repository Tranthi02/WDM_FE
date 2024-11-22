import Wrapper from '../assets/wrappers/TextInputWrapper';

const TextInput = ({
  keyValue,
  title,
  value,
  handleChange,
  register,
  error,
}) => {
  return (
    <Wrapper className="text-input-wrapper">
      {title && <label htmlFor={keyValue}>{title}</label>}
      <input
        type="text"
        name={keyValue}
        id={keyValue}
        value={value}
        onChange={handleChange}
        {...register}
      />
      {error && <span className="text-danger">{error.message}</span>}
    </Wrapper>
  );
};
export default TextInput;
