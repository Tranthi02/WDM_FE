import styled from 'styled-components';

const Wrapper = styled.div`
  input {
    min-width: 15rem;
    width: 100%;
    font-size: 1rem;
    margin-top: 0.4rem;
    display: block;
    padding: 0.6rem 1rem;
    border: 1px solid var(--grey-200);
    border-radius: 7px;
    color: var(--grey-400);
  }
  label {
    font-weight: 600;
    margin-right: 1rem;
  }
  .text-danger {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.7rem;
    color: var(--red-dark);
  }
`;
export default Wrapper;
