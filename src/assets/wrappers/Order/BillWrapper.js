import styled from 'styled-components';

const Wrapper = styled.div`
  h4 {
    font-size: 1.5rem;
    margin-top: 2rem;
    text-align: center;
    font-weight: 700;
  }
  .container {
    width: max-content;
    margin: 2rem auto 0 auto;
    text-align: center;
  }
  h5 {
    text-align: left;
    margin-top: 1rem;
    font-weight: 600;
    font-size: 1.1rem;
  }
  .more-info {
    margin-top: 0.7rem;
    display: flex;
    align-items: center;
    text-transform: capitalize;
    column-gap: 1rem;
    .paid-date {
      font-size: 0.9rem;
      .title {
        margin-right: 0.5rem;
      }
    }
    .pdf-export {
      color: var(--black);
      font-weight: 500;
      text-decoration: underline;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      column-gap: 0.5rem;
    }
  }
  .btn {
    margin-top: 1.8rem;
    padding: 0.7rem 2.5rem;
  }
  .red {
    color: var(--red-dark);
  }
`;

export default Wrapper;
