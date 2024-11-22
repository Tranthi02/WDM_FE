import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 3rem;
  text-transform: capitalize;
  h4 {
    text-align: center;
    margin-top: 2.5rem;
    font-weight: 700;
  }
  p {
    margin-top: 0.5rem;
    text-align: center;
  }
  .container {
    width: max-content;
    margin: 3rem auto 0 auto;
  }
  h5 {
    font-weight: 600;
    font-size: 1.2em;
  }
  .text-row,
  .text-input-wrapper {
    margin-top: 0.7rem;
  }
  .text-input-wrapper input {
    min-width: 100%;
  }
  .text-row {
    column-gap: 2.5rem;
  }
  .payment {
    position: relative;
    margin-top: 1.5rem;
  }
  .btn-wrapper {
    text-align: center;
    position: relative;
    margin-top: 2.7rem;
  }
  .btn {
    padding: 0.7rem 1.7rem;
    font-size: 1rem;
    font-weight: 500;
  }
  .checkbox-wrapper {
    position: absolute;
    right: 0;
    top: 50%;
    translate: 0 -50%;
  }
`;

export default Wrapper;
