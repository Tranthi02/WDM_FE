import styled from 'styled-components';

const Wrapper = styled.div`

  .table {
    width: 100%;
    margin-top: 0.5rem;
    border-top: 1px solid var(--grey-400);
    border-left: 1px solid var(--grey-400);
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 2fr 3fr;
    border-bottom: 1px solid var(--grey-400);
  }
  .cell {
    text-align: center;
    border-right: 1px solid var(--grey-400);
    padding: 0.5rem 0.6rem;
    text-transform: capitalize;
    font-size: 0.9rem;
  }
  .red {
    color: var(--red-dark);
  }
  .open-modal {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    column-gap: 0.5rem;
    color: var(--grey-400);
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default Wrapper;
