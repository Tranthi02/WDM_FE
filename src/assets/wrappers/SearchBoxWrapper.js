import styled from 'styled-components';

const Wrapper = styled.div`
  form {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 999px;
    background-color: var(--grey-100);
    border: 1px solid transparent;
    transition: border-color 0.25s;
  }
  form:focus-within {
    border-color: var(--primary);
    .icon {
      color: var(--primary);
    }
  }
  .icon {
    color: var(--grey-300);
    margin: 0 0.5rem;
    transition: color 0.5s;
  }
  input {
    text-transform: capitalize;
  }
  input::placeholder {
    color: var(--grey-400);
    font-weight: 500;
  }
`;

export default Wrapper;
