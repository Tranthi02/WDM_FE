import styled from 'styled-components';

const Wrapper = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }
  tr {
    border-bottom: 0.5px solid var(--grey-200);
  }
  tr:last-child {
    border-bottom: none;
  }
  tbody {
    tr.can-click:hover {
      background-color: var(--grey-100);
      cursor: pointer;
    }
  }
  th {
    color: var(--grey-400);
    font-weight: 400;
    padding-bottom: 1.1rem;
    .sort-icon {
      margin-left: 5px;
    }
  }
  td {
    text-align: center;
    padding: 1rem 0;
    text-transform: capitalize;
    font-size: 1rem;
    color: var(--black);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .paid {
    color: var(--green-dark);
  }
  .deposit {
    color: var(--red-dark);
  }
  .pending {
    color: var(--yellow-dark);
  }
  .page-group {
    position: absolute;
    bottom: 0;
    margin-bottom: 1.5rem;
    left: 50%;
    translate: -50% 0;
    display: flex;
    align-items: center;
    column-gap: 1.3rem;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      cursor: pointer;
      border: 1px solid var(--primary);
      color: var(--primary);
      border-radius: var(--border-radius);
    }
    button:disabled {
      border: 1px solid var(--grey-400);
      color: var(--grey-400);
      cursor: default;
    }
  }
`;

export default Wrapper;
