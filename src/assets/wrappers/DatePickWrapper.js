import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 15rem;
  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;
  fieldset {
    border: 1px solid var(--grey-200);
    border-radius: 7px;
  }
  input {
    padding: 0.6rem 1rem;
    font-size: 1rem;
    color: var(--grey-400);
  }
  label {
    font-weight: 600;
    margin-right: 1rem;
  }
`;
export default Wrapper;
