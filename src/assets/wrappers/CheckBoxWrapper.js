import styled from 'styled-components';

const Wrapper = styled.div`
  label {
    color: var(--grey-400);
  }
  .checked {
    color: var(--primary);
  }
  input[type='checkbox'] {
    margin-right: 0.5rem;
    accent-color: var(--primary);
  }
  .strong {
    font-weight: 700;
  }
`;
export default Wrapper;
