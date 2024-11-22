import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  input[type='radio'] {
    -webkit-appearance: none;
    margin: 0;
    appearance: none;
    color: var(--grey-300);
    width: 1em;
    height: 1em;
    border: 1px solid var(--grey-300);
    border-radius: 50%;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
    transition: 0.1s border-color ease-in-out;
  }
  input[type='radio']:checked {
    border-color: var(--primary);
  }
  input[type='radio']::before {
    content: '';
    width: 0.5em;
    height: 0.5em;
    border-radius: 50%;
    transform: scale(0);
    box-shadow: inset 1em 1em var(--primary);
    transition: 120ms transform ease-in-out;
  }
  input[type='radio']:checked::before {
    transform: scale(1);
  }
`;
export default Wrapper;
