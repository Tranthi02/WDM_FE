import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 3rem;
  text-transform: capitalize;
  h4 {
    margin-bottom: 2.2rem;
    text-align: center;
    font-weight: 700;
  }
  .header {
    position: relative;
  }
  .icon {
    position: absolute;
    right: 0;
    top: 50%;
    translate: 0 -50%;
    color: var(--primary);
    cursor: pointer;
  }
  .container {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  h5 {
    text-align: center;
    font-weight: 600;
    font-size: 1.4em;
  }
  .shift {
    text-align: center;
    font-size: 0.9rem;
    margin-top: 0.3rem;
    color: var(--grey-400);
  }
  .rows {
    width: max-content;
    margin: 0 auto;
  }
  .btn {
    padding: 0.7rem 1.7rem;
    font-size: 1rem;
    font-weight: 500;
    margin: 2rem auto 0;
    display: block;
  }
`;
export default Wrapper;
