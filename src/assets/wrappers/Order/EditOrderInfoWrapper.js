import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 3rem;
  text-transform: capitalize;
  h4 {
    font-size: 1.6rem;
    text-align: center;
    margin-bottom: 3rem;
    font-weight: 700;
  }
  .container {
    margin-top: 2rem;
    gap: 38px;
    margin-top: 2rem;
    display: flex;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;

    .customer_info {
    }
  }
  h5 {
    font-weight: 600;
    text-align: center;
    font-size: 1.4em;
  }
  .shift {
    text-align: center;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    color: var(--grey-400);
  }
  .text-row,
  .date-wrapper,
  .text-input-wrapper,
  h5 {
    margin-top: 1.5rem;
  }
  .text-row {
    column-gap: 2.5rem;
  }
  .right-col {
    .col-header {
      position: relative;
    }
    .rows {
      width: max-content;
      margin: 0 auto;
    }
    .icon {
      position: absolute;
      top: 50%;
      right: 2rem;
      translate: 0 -50%;
      color: var(--primary);
      cursor: pointer;
    }
  }
  .btn-wrapper {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 2rem;
  }
  .btn {
    padding: 0.7rem 1.7rem;
    font-size: 1rem;
    font-weight: 500;
    display: block;
  }
  .delete {
    background-color: var(--red-dark);
  }
`;
export default Wrapper;
