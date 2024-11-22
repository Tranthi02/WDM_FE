import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 3rem;
  h4 {
    font-size: 1.6rem;
    margin-bottom: 2rem;
    text-align: center;
    font-weight: 700;
  }
  .header {
    position: relative;
    padding: 0 2rem;
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
    display: flex;
    justify-content: center;
    gap: 40px;
    grid-template-columns: 1fr 1fr;
    flex-wrap: wrap;
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
    text-transform: capitalize;
  }
  .rows {
    width: max-content;
    margin: 0 auto;
  }
  .btn {
    padding: 0.7rem 1.7rem;
    font-size: 1rem;
    font-weight: 500;
    margin: 2.2rem auto 0 auto;
    display: block;
  }
`;
export default Wrapper;
